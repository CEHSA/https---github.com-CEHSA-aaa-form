import { Request, Response } from 'express';
import CryptoJS from 'crypto-js';
import { 
  OzowNotification, 
  mapOzowStatusToInternal,
  SUPPORTED_CURRENCIES
} from '../../types/payment';
import { logger } from '../../utils/logger';

interface NotificationHandlerConfig {
  onPaymentComplete?: (notification: OzowNotification) => Promise<void>;
  onPaymentCancelled?: (notification: OzowNotification) => Promise<void>;
  onPaymentFailed?: (notification: OzowNotification) => Promise<void>;
}

export class PaymentNotificationHandler {
  private readonly privateKey: string;
  private readonly config: NotificationHandlerConfig;

  constructor(config: NotificationHandlerConfig = {}) {
    const privateKey = process.env.OZOW_PRIVATE_KEY;
    if (!privateKey) {
      throw new Error('Missing OZOW_PRIVATE_KEY environment variable');
    }
    this.privateKey = privateKey;
    this.config = config;
  }

  private validateNotification(notification: OzowNotification): void {
    if (!notification.TransactionId) {
      throw new Error('Missing TransactionId in notification');
    }
    if (!notification.TransactionReference) {
      throw new Error('Missing TransactionReference in notification');
    }
    if (!notification.Amount || isNaN(parseFloat(notification.Amount))) {
      throw new Error('Invalid Amount in notification');
    }
    if (!notification.Status) {
      throw new Error('Missing Status in notification');
    }
    if (!notification.CurrencyCode || !SUPPORTED_CURRENCIES.includes(notification.CurrencyCode)) {
      throw new Error('Invalid CurrencyCode in notification');
    }
    if (!notification.HashCheck) {
      throw new Error('Missing HashCheck in notification');
    }
  }

  private verifyHash(notification: OzowNotification): boolean {
    const hashString = [
      notification.TransactionId,
      notification.TransactionReference,
      notification.Amount,
      notification.Status,
      notification.CurrencyCode,
      notification.BankReference,
      notification.Optional1 || '',
      notification.Optional2 || '',
      notification.Optional3 || '',
      notification.Optional4 || '',
      notification.Optional5 || '',
      notification.IsTest,
      this.privateKey
    ].join('');

    const calculatedHash = CryptoJS.SHA512(hashString).toString().toLowerCase();
    return calculatedHash === notification.HashCheck.toLowerCase();
  }

  public async handleNotification(req: Request, res: Response): Promise<void> {
    try {
      const notification = req.body as OzowNotification;

      // Validate notification data
      this.validateNotification(notification);

      // Verify hash
      if (!this.verifyHash(notification)) {
        logger.error('Hash verification failed', {
          expectedHash: CryptoJS.SHA512([
            notification.TransactionId,
            notification.TransactionReference,
            this.privateKey
          ].join('')).toString().toLowerCase(),
          receivedHash: notification.HashCheck
        });
        res.status(400).json({ error: 'Invalid hash' });
        return;
      }

      // Map Ozow status to internal status
      const internalStatus = mapOzowStatusToInternal(notification.Status);
      
      // Log notification details
      logger.info('Payment notification received', {
        transactionId: notification.TransactionId,
        reference: notification.TransactionReference,
        amount: notification.Amount,
        status: internalStatus,
        property: notification.Optional1,
        room: notification.Optional2,
        lessee: notification.Optional3,
        email: notification.Optional4,
        phone: notification.Optional5
      });

      // Handle different payment statuses
      try {
        switch (internalStatus) {
          case 'complete':
            if (this.config.onPaymentComplete) {
              await this.config.onPaymentComplete(notification);
            }
            break;
          
          case 'cancelled':
            if (this.config.onPaymentCancelled) {
              await this.config.onPaymentCancelled(notification);
            }
            break;
          
          case 'failed':
            if (this.config.onPaymentFailed) {
              await this.config.onPaymentFailed(notification);
            }
            break;
          
          default:
            logger.info('Unhandled payment status', { status: internalStatus });
        }
      } catch (error) {
        logger.error('Error in payment status handler', { error });
        // Don't throw here, we still want to acknowledge receipt
      }

      // Always respond with 200 OK to acknowledge receipt
      res.status(200).json({ status: 'OK' });
    } catch (error) {
      logger.error('Payment notification error', { error });
      // Still return 200 to prevent Ozow from retrying
      res.status(200).json({ status: 'OK', error: 'Internal processing error' });
    }
  }
}

// Create and export the default handler
const defaultHandler = new PaymentNotificationHandler();
export const handlePaymentNotification = defaultHandler.handleNotification.bind(defaultHandler);
