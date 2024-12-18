import { z } from 'zod';

// Common validation patterns
const phoneRegex = /^(\+27|0)\d{2}[\s-]?\d{3}[\s-]?\d{4}$/;
const saIdRegex = /^\d{13}$/;
const registrationNumberRegex = /^\d{4}\/\d{6}\/\d{2}$/;

export const lessorSchema = z.object({
  companyName: z.string().min(1).max(100),
  registrationNumber: z.string().regex(registrationNumberRegex, 'Invalid registration number format'),
  physicalAddress: z.string().min(1).max(200),
  email: z.string().email(),
  contactNumber: z.string().regex(phoneRegex, 'Invalid phone number format')
});

export const lesseeSchema = z.object({
  fullName: z.string().min(1).max(100),
  idNumber: z.string().regex(saIdRegex, 'Invalid SA ID number'),
  physicalAddress: z.string().min(1).max(200),
  email: z.string().email(),
  contactNumber: z.string().regex(phoneRegex, 'Invalid phone number format'),
  courseEnrolled: z.string().min(1)
});

export const guardianSchema = z.object({
  fullName: z.string().min(1).max(100),
  idNumber: z.string().regex(saIdRegex, 'Invalid SA ID number'),
  physicalAddress: z.string().min(1).max(200),
  email: z.string().email(),
  contactNumber: z.string().regex(phoneRegex, 'Invalid phone number format'),
  relationship: z.string().min(1)
});

export const bankingSchema = z.object({
  accountHolder: z.string().min(1),
  bankName: z.string().min(1),
  branchName: z.string().min(1),
  branchCode: z.string().length(6),
  accountNumber: z.string().min(1),
  reference: z.string().min(1)
});

export const leaseSchema = z.object({
  leaseType: z.enum(['bursary', 'private']),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  monthlyRental: z.number().positive(),
  annualRental: z.number().positive(),
  keyReturnDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  nsfasNumber: z.string().optional()
});