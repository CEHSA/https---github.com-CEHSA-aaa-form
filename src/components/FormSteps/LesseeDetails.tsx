import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card } from '../ui/card';

interface Address {
  street: string;
  city: string;
  state: string;
  postalCode: string;
}

interface LesseeDetailsProps {
  formData: FormData;
  onFormDataChange: (newData: Partial<FormData>) => void;
}

interface FormData {
  lesseeName: string;
  lesseeIdNumber: string;
  lesseeEmail: string;
  lesseePhone: string;
  physicalAddress: Address;
  enrolledCourse: string;
}

interface FormErrors {
  physicalAddress?: {
    street?: { message: string };
    city?: { message: string };
    state?: { message: string };
    postalCode?: { message: string };
  };
}

export function LesseeDetails({ formData, onFormDataChange }: LesseeDetailsProps) {
  const { formState: { errors } } = useFormContext<FormData>();
  const [address, setAddress] = useState<Address>({
    street: formData.physicalAddress.street || '',
    city: formData.physicalAddress.city || '',
    state: formData.physicalAddress.state || '',
    postalCode: formData.physicalAddress.postalCode || ''
  });

  const handleAddressChange = (field: keyof Address, value: string) => {
    const newAddress = { ...address, [field]: value };
    setAddress(newAddress);
    onFormDataChange({ physicalAddress: newAddress });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="lesseeName">Full Name</Label>
            <Input
              id="lesseeName"
              value={formData.lesseeName || ''}
              onChange={(e) => onFormDataChange({ lesseeName: e.target.value })}
              error={errors.lesseeName?.message as string}
            />
          </div>
          <div>
            <Label htmlFor="lesseeIdNumber">ID Number</Label>
            <Input
              id="lesseeIdNumber"
              value={formData.lesseeIdNumber || ''}
              onChange={(e) => onFormDataChange({ lesseeIdNumber: e.target.value })}
              error={errors.lesseeIdNumber?.message as string}
            />
          </div>
          <div>
            <Label htmlFor="lesseeEmail">Email</Label>
            <Input
              id="lesseeEmail"
              type="email"
              value={formData.lesseeEmail || ''}
              onChange={(e) => onFormDataChange({ lesseeEmail: e.target.value })}
              error={errors.lesseeEmail?.message as string}
            />
          </div>
          <div>
            <Label htmlFor="lesseePhone">Phone Number</Label>
            <Input
              id="lesseePhone"
              value={formData.lesseePhone || ''}
              onChange={(e) => onFormDataChange({ lesseePhone: e.target.value })}
              error={errors.lesseePhone?.message as string}
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Address</h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label htmlFor="street">Street Address</Label>
            <Input
              id="street"
              value={address.street}
              onChange={(e) => handleAddressChange('street', e.target.value)}
              error={(errors as FormErrors).physicalAddress?.street?.message}
            />
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Input
              id="city"
              value={address.city}
              onChange={(e) => handleAddressChange('city', e.target.value)}
              error={(errors as FormErrors).physicalAddress?.city?.message}
            />
          </div>
          <div>
            <Label htmlFor="state">State/Province</Label>
            <Input
              id="state"
              value={address.state}
              onChange={(e) => handleAddressChange('state', e.target.value)}
              error={(errors as FormErrors).physicalAddress?.state?.message}
            />
          </div>
          <div>
            <Label htmlFor="postalCode">Postal Code</Label>
            <Input
              id="postalCode"
              value={address.postalCode}
              onChange={(e) => handleAddressChange('postalCode', e.target.value)}
              error={(errors as FormErrors).physicalAddress?.postalCode?.message}
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Course Information</h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <Label htmlFor="enrolledCourse">Course Currently Enrolled For</Label>
            <Input
              id="enrolledCourse"
              value={formData.enrolledCourse || ''}
              onChange={(e) => onFormDataChange({ enrolledCourse: e.target.value })}
              error={errors.enrolledCourse?.message as string}
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-lg font-semibold mb-4">Important Information</h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <p className="text-sm text-aaa-white/80">
              Any bursary that is not NSFAS needs to pay the full amount up front for the allocated term of the lease agreement in the first month of occupation.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}