import React from 'react';

interface ConfirmationProps {
  data: {
    email: string;
    rentalType: string;
    budget: string;
  };
}

const Confirmation: React.FC<ConfirmationProps> = ({ data }) => {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-bold">Confirmation</h2>
      <div className="mb-4">
        <p>
          <strong>Email:</strong> {data.email}
        </p>
        <p>
          <strong>Rental Type:</strong> {data.rentalType}
        </p>
        <p>
          <strong>Budget:</strong> {data.budget}
        </p>
      </div>
    </div>
  );
};

export default Confirmation;
