import  { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import useGetProductById from '../../hooks/prod/useGetProductById';
import usePatchOneProduct from '../../hooks/prod/usePatchoneproduct';


type ProductType = 'PROCESSOR' | 'MOTHERBOARD' | 'VIDEOCARD' | 'MEMORY' | 'HARDDRIVE' | 'POWERSUPPLY' | 'POWERHOUSE' | 'CPUCOOLER';

interface Product {
  id: number;
  name: string;
  manufacturer:string;
  type: ProductType;
  price: number;
  couantity: number;
  imgSrc: string;
  [key: string]: any;
}

const ProductDetailsContent: React.FC = () => {
  const { id } = useParams();
  const cleanId = id?.split(':')[0];
  const { product, loading, error: fetchError, refetch } = useGetProductById<Product>(Number(cleanId));
  const patchProduct = usePatchOneProduct(); 

  const [isEditing, setIsEditing] = useState(false);

  const [currentPrice, setCurrentPrice] = useState<number>(0);

  const [percentage, setPercentage] = useState<string>('');
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setCurrentPrice(product.price);
    }
  }, [product]);

  if (loading) return <div className="text-xl text-center p-10">Loading...</div>;
  if (fetchError || !product) return <div className="text-xl text-red-600 text-center p-10">Error loading product</div>;

  const renderField = (label: string, value: any) => (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-600 mb-1">{label}</label>
      <div className="p-2 bg-gray-50 rounded border border-gray-300">
        {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
      </div>
    </div>
  );

  const formatValue = (key: string, value: any): string => {
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (value === null || value === undefined) return 'N/A';
    

    if (key.toLowerCase().includes('frequency')) return `${value} GHz`;
    else if (key.toLowerCase().includes('speed')) return `${value} ${key.toLowerCase().includes('fan') ? 'RPM' : 'MHz'}`;
    else if (key.toLowerCase().includes('capacity') || key.toLowerCase().includes('memory')) return `${value} GB`;
    else if (key === 'cache') return `${value} MB`;
    else if (key === 'performance') return `${value}W`;
    else if (key.toLowerCase().includes('flow')) return `${value} CFM`;
    else if (key.toLowerCase().includes('wattage') || key.toLowerCase().includes('power') || key === 'suggestedPower') return `${value}W`;
    else if (key.toLowerCase().includes('bandwidth')) return `${value} GB/s`;
    
    return String(value);
  };

  const formatLabel = (key: string): string => {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  const findDetailsObject = (): [string, Record<string, any>] | [null, null] => {
   
    for (const [key, value] of Object.entries(product)) {
   
      if (['id', 'name','manufacturer', 'type', 'price', 'couantity'].includes(key) || !value) {
        continue;
      }
      
    
      if (typeof value === 'object' && !Array.isArray(value)) {
        return [key, value as Record<string, any>];
      }
    }
    
    return [null, null];
  };

  const renderDetails = () => {
    const [detailsKey, details] = findDetailsObject();
    
    if (!detailsKey || !details) {
      return <div className="text-gray-600">No technical specifications available for this product.</div>;
    }
    
    return (
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(details).map(([key, value]) => {
         
          if (key === 'id' || key === 'productId') return null;
          
          const label = formatLabel(key);
          const formattedValue = formatValue(key, value);
          
          return renderField(label, formattedValue);
        })}
      </div>
    );
  };

  const handlePriceUpdate = async (percentageValue: number) => {
    setIsUpdating(true);
    if (product) {
      const newPrice = product.price * (1 + percentageValue / 100);
      try {
        await patchProduct.updateProductPrice(product.id, newPrice);
        setCurrentPrice(newPrice);
        await refetch();
        setIsEditing(false);
      } catch (error) {
        console.error('Failed to update price:', error);
        setError('Failed to update price. Please try again.');
      } finally {
        setIsUpdating(false);
      }
    }
  };



  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto mt-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">{product.name}</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        {renderField('Manufacturer', product.manufacturer)}
        {renderField('Price', `$${currentPrice.toFixed(2)}`)}
        {renderField('Stock', `${product.quantity || product.couantity || 0} units`)}
        {renderField('Product Type', formatLabel(product.type))}
      </div>
      
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Technical Specifications</h3>
        {renderDetails()}
      </div>
      
      <div className="mt-6 text-right flex justify-end items-center gap-4">
        {isEditing ? (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                className={`w-20 px-2 py-1 border rounded ${isUpdating ? 'opacity-50 pointer-events-none' : ''}`}
                placeholder="%"
                disabled={isUpdating}
              />
              <button
                onClick={() => handlePriceUpdate(parseFloat(percentage))}
                disabled={isUpdating}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:bg-blue-300"
              >
                {isUpdating ? 'Updating...' : 'Update Price'}
              </button>
              <button
                onClick={() => {
                  setCurrentPrice(product.price);
                  setIsEditing(false);
                  setError(null);
                }}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          </div>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            <span>Modify Price</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsContent;
