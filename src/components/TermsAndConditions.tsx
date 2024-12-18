import React from 'react';

interface Section {
  title: string;
  content: string[];
}

const terms: Section[] = [
  {
    title: "1. Definitions",
    content: [
      "1.1 'Building' means the building recorded on the cover page of this agreement",
      "1.2 'Day' means any day of the week, excluding weekends and public holidays",
      "1.3 'Guardian' means the guardian of the Lessee (if the Lessee is a minor) who enters into this agreement on behalf of the Lessee",
      "1.4 'Lease Period' means the lease period recorded on the cover page of this agreement",
      "1.5 'Lease Start Date' means the start date recorded on the cover page of this agreement",
      "1.6 'Lessee' means the NSFAS Funded Student and Lessee recorded on the cover page of this agreement",
      "1.7 'Lessor' means the Lessor or the Landlord recorded on the cover page of this agreement",
      "1.8 'Month' means a calendar month",
      "1.9 'National Accreditation Panel' is the NSFAS National Accreditation Panel appointed to accredit accommodation",
      "1.10 'NSFAS' means the National Student Financial Aid Scheme"
    ]
  },
  {
    title: "2. Rent and Payment",
    content: [
      "2.1 The rent payable is recorded on the cover page of this agreement",
      "2.2 The rent will be paid monthly to the Lessor by NSFAS on behalf of the Lessee",
      "2.3 The Lessor may not require or permit the Lessee to pay a deposit",
      "2.4 A processing fee of R300.00 is required"
    ]
  },
  {
    title: "3. Duration",
    content: [
      "3.1 The lease will start on the commencement date and end on the termination date",
      "3.2 The Lessee warrants valid and current bursary agreement with NSFAS"
    ]
  }
];

interface TermsAndConditionsProps {
  onAccept: () => void;
}

export function TermsAndConditions({ onAccept }: TermsAndConditionsProps) {
  const [expandedSection, setExpandedSection] = React.useState<number | null>(null);

  return (
    <div className="max-h-[60vh] overflow-y-auto bg-white rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Terms and Conditions</h2>
      
      {terms.map((section, index) => (
        <div key={index} className="mb-4">
          <button
            onClick={() => setExpandedSection(expandedSection === index ? null : index)}
            className="w-full text-left p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <h3 className="text-lg font-semibold flex justify-between items-center">
              {section.title}
              <span className="text-gray-500">
                {expandedSection === index ? '−' : '+'}
              </span>
            </h3>
          </button>
          
          {expandedSection === index && (
            <div className="mt-2 p-4 bg-white border border-gray-200 rounded-lg">
              {section.content.map((item, itemIndex) => (
                <p key={itemIndex} className="mb-2 text-gray-700">
                  {item}
                </p>
              ))}
            </div>
          )}
        </div>
      ))}
      
      <div className="mt-6 flex justify-end">
        <button
          onClick={onAccept}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Accept Terms
        </button>
      </div>
    </div>
  );
}