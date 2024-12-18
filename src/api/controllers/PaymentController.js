"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
var dotenv_1 = require("dotenv");
var crypto = require("crypto");
// Load environment variables
(0, dotenv_1.config)();
var PaymentController = /** @class */ (function () {
    function PaymentController() {
        var _this = this;
        this.ozowBaseUrl = 'https://pay.ozow.com';
        this.initializePayment = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var paymentData, credentials, formattedAmount, hashCheck, formData;
            return __generator(this, function (_a) {
                try {
                    console.log('Initializing payment with request:', {
                        body: req.body,
                        headers: req.headers
                    });
                    paymentData = req.body;
                    credentials = this.validateEnvironmentVariables();
                    formattedAmount = this.formatAmount(paymentData.amount);
                    hashCheck = this.generateHash(credentials.siteCode, formattedAmount, paymentData.reference, credentials.privateKey);
                    formData = {
                        SiteCode: credentials.siteCode,
                        CountryCode: 'ZAF',
                        CurrencyCode: 'ZAR',
                        Amount: formattedAmount,
                        TransactionReference: paymentData.reference,
                        BankReference: paymentData.reference,
                        NotifyUrl: paymentData.notifyUrl,
                        SuccessUrl: paymentData.successUrl,
                        CancelUrl: paymentData.cancelUrl,
                        ErrorUrl: paymentData.cancelUrl,
                        IsTest: 'false',
                        HashCheck: hashCheck,
                        ApiKey: credentials.apiKey,
                        Optional1: '',
                        Optional2: '',
                        Optional3: '',
                        Optional4: '',
                        Optional5: '',
                        Customer: JSON.stringify({
                            Title: '',
                            FirstName: 'Test',
                            LastName: 'Customer',
                            Email: 'test@example.com',
                            Mobile: '',
                            BusinessName: ''
                        })
                    };
                    console.log('Generated Ozow payment data:', {
                        url: "".concat(this.ozowBaseUrl, "/pay"),
                        formData: formData
                    });
                    res.json({
                        redirectUrl: "".concat(this.ozowBaseUrl, "/pay"),
                        formData: formData
                    });
                }
                catch (error) {
                    console.error('Payment initialization failed:', error);
                    res.status(500).json({
                        error: 'Failed to initialize payment',
                        message: error instanceof Error ? error.message : 'Unknown error'
                    });
                }
                return [2 /*return*/];
            });
        }); };
        this.checkStatus = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var transactionId;
            return __generator(this, function (_a) {
                try {
                    transactionId = req.params.transactionId;
                    // Implement status check logic here
                    res.json({ status: 'pending', transactionId: transactionId });
                }
                catch (error) {
                    console.error('Failed to check transaction status:', error);
                    res.status(500).json({ error: 'Failed to check transaction status' });
                }
                return [2 /*return*/];
            });
        }); };
    }
    PaymentController.prototype.generateHash = function (siteCode, amount, reference, privateKey) {
        // Hash string format: SiteCode + Amount + TransactionReference + PrivateKey
        var hashString = "".concat(siteCode).concat(amount).concat(reference).concat(privateKey);
        // Create SHA-512 hash and convert to lowercase
        return crypto.createHash('sha512')
            .update(hashString)
            .digest('hex')
            .toLowerCase();
    };
    PaymentController.prototype.formatAmount = function (amount) {
        // Convert to number, fix to 2 decimal places, and ensure it's a string
        return Number(amount).toFixed(2);
    };
    PaymentController.prototype.validateEnvironmentVariables = function () {
        var siteCode = process.env.VITE_OZOW_SITE_CODE;
        var apiKey = process.env.VITE_OZOW_API_KEY;
        var privateKey = process.env.VITE_OZOW_PRIVATE_KEY;
        if (!siteCode || !apiKey || !privateKey) {
            var missingVars = [
                !siteCode && 'siteCode',
                !apiKey && 'apiKey',
                !privateKey && 'privateKey'
            ].filter(Boolean);
            throw new Error("Missing required environment variables: ".concat(missingVars.join(', ')));
        }
        return { siteCode: siteCode, apiKey: apiKey, privateKey: privateKey };
    };
    return PaymentController;
}());
exports.PaymentController = PaymentController;
