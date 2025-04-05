import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useProducts from "../../hooks/prod/useProducts";
import usePatchOneProduct from '../../hooks/prod/usePatchoneproduct';
import DataTable, { Column } from '../common/DataTable';

interface Product {
  id: number;
  name: string;
  manufacturer: string;
  type: string;
  price: number;
  couantity: number; 
}

const Content: React.FC = () => {
  const navigate = useNavigate();
  const { products, loading: productsLoading, error: dataError, refetch } = useProducts();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { updateProductPrice } = usePatchOneProduct(); 
  const [percentage, setPercentage] = useState<string>('');
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  
  
  const inputRef = useRef<HTMLInputElement>(null);
  const [resetKey, setResetKey] = useState(0);

 
  const resetForm = () => {
    setIsEditing(false);
    setPercentage('');
    setUpdateError(null);
    setResetKey(k => k + 1);
  };

  const handleView = (product: Product) => {
    navigate(`/products/${product.id}`);
  };

  const handleEditClick = () => {
   
    setIsEditing(false);
    setPercentage('');
    setUpdateError(null);
    setResetKey(k => k + 1);
    
   
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        setIsEditing(true);
      });
    });
  };

  useEffect(() => {
    if (isEditing && !isUpdating && inputRef.current) {
   
      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isEditing, isUpdating, resetKey]);

  const handleUpdate = async () => {
    const percentageValue = parseFloat(percentage);
    
    if (isNaN(percentageValue)) {
      setUpdateError('Please enter a valid percentage value');
      return;
    }
    
    const confirmMessage = percentageValue >= 0
      ? `Are you sure you want to increase price by ${percentageValue}%?`
      : `Are you sure you want to decrease price by ${Math.abs(percentageValue)}%?`;
      
    if (!window.confirm(confirmMessage)) {
      return;
    }
    
    try {
      setIsUpdating(true);
      setUpdateError(null);
      
      // Set up state for the non-blocking update process
      const productArray = [...(products || [])];
      let processed = 0;
      let successful = 0;
      
    
      const processNextProduct = () => {
        if (processed >= productArray.length) {
         
          setUpdateError("All updates complete. Refreshing data...");
       
          setTimeout(async () => {
            try {
              await refetch();
              setIsEditing(false);
              setIsUpdating(false);
              setPercentage('');
              setUpdateError(null);
            } catch (error) {
              console.error('Error refreshing data:', error);
              setUpdateError('Updates completed but error refreshing data.');
              setIsUpdating(false);
            }
          }, 100);
          
          return;
        }
        
        // Get the next product to process
        const product = productArray[processed];
        const newPrice = product.price * (1 + percentageValue / 100);
        
        // Update progress display
        setUpdateError(`Updating ${processed + 1} of ${productArray.length}...`);
        
        // Use setTimeout to yield control back to the browser
        setTimeout(async () => {
          try {
            await updateProductPrice(product.id, newPrice);
            successful++;
          } catch (error) {
            console.error(`Error updating product ${product.id}:`, error);
          }
          
          processed++;
          
          // Display the updated progress
          setUpdateError(`Updated ${successful} of ${processed} products (${productArray.length} total)`);
      
          setTimeout(processNextProduct, 50);
        }, 50);
      };
      
  
      processNextProduct();
      
    } catch (error) {
      console.error('Error in update process:', error);
      setUpdateError('An error occurred during update. Please try again.');
      setIsUpdating(false);
    }
  };
  
  const columns: Column<Product>[] = [
    { header: 'ID', accessor: 'id', width: '10%' },
    { header: 'Name', accessor: 'name', width: '25%' },
    { header: 'Manufacturer', accessor: 'manufacturer', width: '20%' },
    { header: 'Type', accessor: 'type', width: '15%' },
    { 
      header: 'Price ($)', 
      accessor: (item: Product) => `$${item.price.toFixed(2)}`,
      width: '15%'
    },
    { header: 'Quantity', accessor: 'couantity', width: '15%' }  
  ];

  return (
    <div className="mt-5">
      <DataTable
        data={products || []}
        columns={columns}
        keyField="id"
        loading={productsLoading}
        error={dataError}
        searchPlaceholder="Search by name, manufacturer or type"
        searchFields={['name', 'manufacturer', 'type']}
        onRowClick={handleView}
      />

      <div className="flex flex-col items-center gap-4 mt-8">
        <button
          onClick={() => navigate('/addProduct/select')}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg flex items-center"
          disabled={isUpdating}
        >
          Add New Product
        </button>

        {isEditing ? (
          <div className="flex flex-col items-center gap-2 w-full max-w-md">
            <div className="flex items-center gap-2">
              <input
                key={`percentage-input-${resetKey}`}
                ref={inputRef}
                type="number"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                className="w-24 px-2 py-1 border rounded"
                placeholder="%"
                disabled={isUpdating}
                autoFocus
              />
              <button
                onClick={handleUpdate}
                disabled={isUpdating}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:bg-blue-300"
              >
                {isUpdating ? 'Updating...' : 'Update Price'}
              </button>
              <button
                onClick={() => !isUpdating && resetForm()}
                disabled={isUpdating}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors disabled:bg-gray-200"
              >
                Cancel
              </button>
            </div>
            
            {isUpdating && (
              <div className="text-center mt-2">
                <span>{updateError}</span>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={handleEditClick}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg flex items-center mt-4"
          >
            Modify All Prices
          </button>
        )}
      </div>
    </div>
  );
};

export default Content;