import type { OptionalExtra } from './extras';

interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
}

interface Room {
  id: string;
  number: string;
  floor: number;
  type: string;
  available: boolean;
}

interface Property {
  id: string;
  name: string;
  address: string;
  rooms: Room[];
}

interface PricingOption {
  id: string;
  name: string;
  price: number;
  period: 'month' | 'year';
}

export interface FormData {
  // Lessee Details
  lesseeName: string;
  lesseeIdNumber: string;
  lesseeEmail: string;
  lesseePhone: string;
  physicalAddress: Address;

  // Lessor Details
  lessorName: string;
  registrationNo: string;
  lessorEmail: string;
  lessorPhone: string;

  // Course Details
  enrolledCourse: string;
  institution: string;
  courseName: string;
  yearOfStudy: string;
  studentNumber: string;

  // Guardian Details
  guardianName: string;
  guardianId: string;
  relationship: string;
  guardianEmail: string;
  guardianPhone: string;
  guardianAddress: Address;

  // Contact Information
  email: string;
  phone: string;
  alternativeContact: string;
  contactPreference: 'email' | 'phone';

  // Lease Details
  leaseType: 'fixed' | 'month-to-month';
  leaseStartDate: string;
  leaseEndDate: string;
  keyReturnDate: string;
  keyReturnTime: string;

  // Banking Details
  accountHolder: string;
  bank: string;
  accountNumber: string;
  branchCode: string;
  branchName: string;

  // Property Selection
  selectedProperty?: Property;
  selectedRoom?: Room;
  selectedPricing?: PricingOption;
  selectedExtras: OptionalExtra[];

  // NSFAS Details
  nsfasNumber?: string;

  // Marketing and Terms
  directMarketing: boolean;
  acceptedTerms: boolean;
  rentalType?: 'month' | 'year';
}