import React, { useState } from 'react';

interface PriceUpdateFormProps {
  onUpdate: (percentageValue: number) => Promise<void>;
  onCancel: () => void;
}

const PriceUpdateForm: React.FC<PriceUpdateFormProps> = ({ onUpdate, onCancel }) => {
  const [percentage, setPercentage] = useState<string>('');
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = async () => {
    const percentageValue = parseFloat(percentage);
    
    if (isNaN(percentageValue)) {
      setError('Please enter a valid percentage value');
      return;
    }
    
    const confirmMessage = percentageValue >= 0 
      ? `Are you sure you want to increase price by ${percentageValue}%?`
      : `Are you sure you want to decrease price by ${Math.abs(percentageValue)}%?`;
      
    if (window.confirm(confirmMessage)) {
      try {
        setIsUpdating(true);
        setError(null);
        await onUpdate(percentageValue);
      } catch (err) {
        console.error('Failed to update price:', err);
        setError('Failed to update price. Please try again.');
      } finally {
        setIsUpdating(false);
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-2 mt-4">
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={percentage}
          onChange={(e) => {
            const value = e.target.value;
            // Allow empty string or values between -90 and 1000
            if (value === '' || (parseFloat(value) >= -90 && parseFloat(value) <= 1000)) {
              setPercentage(value);
            }
          }}
          className="w-20 px-2 py-1 border rounded"
          placeholder="%"
        />
        <button
          onClick={handleUpdate}
          disabled={isUpdating}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:bg-blue-300"
        >
          {isUpdating ? 'Updating...' : 'Update Price'}
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
        >
          Cancel
        </button>
      </div>
      {error && (
        <div className="text-red-500 mt-2">{error}</div>
      )}
    </div>
  );
};

export default PriceUpdateForm; 