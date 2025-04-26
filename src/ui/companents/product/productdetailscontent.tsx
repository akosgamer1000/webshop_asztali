/**
 * @file companents/product/productdetailscontent.tsx
 * @module UI/Components/Product
 * @description Product Details Content Component
 * 
 * A component that displays detailed information about a specific product.
 * Features:
 * - Fetches and displays product details
 * - Shows technical specifications
 * - Allows price modification with percentage-based updates
 * - Provides inventory management functionality
 * - Formats values with appropriate units
 * - Handles loading and error states
 * - Responsive design with consistent styling
 * 
 * This component serves as the detailed view for specific products,
 * providing administrators with comprehensive information and management
 * capabilities for individual product entries.
 * 
 * @author WebShop Team
 * @version 1.0.0
 * @since 1.0.0
 */

import  { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import useGetProductById from '../../hooks/prod/useGetProductById';
import usePatchOneProduct from '../../hooks/prod/usePatchoneproduct';

/**
 * Type definition for supported product types
 * @type {string}
 */
type ProductType = 'PROCESSOR' | 'MOTHERBOARD' | 'VIDEOCARD' | 'MEMORY' | 'HARDDRIVE' | 'POWERSUPPLY' | 'POWERHOUSE' | 'CPUCOOLER';

/**
 * Interface representing a product in the system
 * Includes basic product information and allows for additional dynamic properties
 * @interface Product
 * @property {number} id - Unique identifier
 * @property {string} name - Product name
 * @property {string} manufacturer - Manufacturer name
 * @property {ProductType} type - Product type/category
 * @property {number} price - Product price
 * @property {number} quantity - Available quantity
 * @property {string} imgSrc - Product image URL
 * @property {any} [key: string] - Additional dynamic properties
 */
interface Product {
  id: number;           // Unique identifier
  name: string;         // Product name
  manufacturer: string; // Manufacturer name
  type: ProductType;    // Product type/category
  price: number;        // Product price
  quantity: number;     // Available quantity
  imgSrc: string;       // Product image URL
  [key: string]: any;   // Additional dynamic properties
}

/**
 * Product Details Content Component
 * 
 * @component
 * @description Component that displays and manages detailed product information
 * with technical specifications and inventory management
 * 
 * @returns {JSX.Element} A detailed product view with technical specifications
 * @example
 * <Route path="/products/:id" element={<ProductDetailsContent />} />
 */
const ProductDetailsContent: React.FC = () => {
  // Get product ID from URL parameters
  const { id } = useParams();
  const cleanId = id?.split(':')[0];
  
  // Custom hooks for data fetching and updates
  const { product, loading, error: fetchError, refetch } = useGetProductById<Product>(Number(cleanId));
  const patchProduct = usePatchOneProduct(); 

  // State management
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingQuantity, setIsEditingQuantity] = useState(false);
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [currentQuantity, setCurrentQuantity] = useState<number>(0);
  const [percentage, setPercentage] = useState<string>('');
  const [quantityChange, setQuantityChange] = useState<string>('');
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [quantityAction, setQuantityAction] = useState<'add' | 'remove'>('add');

  // Update current price and quantity when product data changes
  useEffect(() => {
    if (product) {
      setCurrentPrice(product.price);
      setCurrentQuantity(product.quantity);
    }
  }, [product]);

  // Loading and error states
  if (loading) return <div className="text-xl text-center p-10">Loading...</div>;
  if (fetchError || !product) return <div className="text-xl text-red-600 text-center p-10">Error loading product</div>;

  /**
   * Renders a form field with label and value
   * @param {string} label - Field label
   * @param {any} value - Field value
   * @returns {JSX.Element} A form field component
   */
  const renderField = (label: string, value: any) => (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-600 mb-1">{label}</label>
      <div className="p-2 bg-gray-50 rounded border border-gray-300">
        {typeof value === 'boolean' ? (value ? 'Yes' : 'No') : value}
      </div>
    </div>
  );

  /**
   * Formats a value based on its key and type
   * Adds appropriate units and formatting
   * @param {string} key - Property key
   * @param {any} value - Property value
   * @returns {string} Formatted value with units
   */
  const formatValue = (key: string, value: any): string => {
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (value === null || value === undefined) return 'N/A';
    
    // Add appropriate units based on property key
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

  /**
   * Formats a property key into a readable label
   * @param {string} key - Property key
   * @returns {string} Formatted label
   */
  const formatLabel = (key: string): string => {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  /**
   * Finds the technical specifications object in the product data
   * @returns {[string, Record<string, any>] | [null, null]} Key and value of the details object
   */
  const findDetailsObject = (): [string, Record<string, any>] | [null, null] => {
    for (const [key, value] of Object.entries(product)) {
      // Skip basic product properties and empty values
      if (['id', 'name','manufacturer', 'type', 'price', 'quantity'].includes(key) || !value) {
        continue;
      }
      
      // Return the first object that contains technical specifications
      if (typeof value === 'object' && !Array.isArray(value)) {
        return [key, value as Record<string, any>];
      }
    }
    
    return [null, null];
  };

  /**
   * Renders the technical specifications section
   * @returns {JSX.Element} Technical specifications grid
   */
  const renderDetails = () => {
    const [detailsKey, details] = findDetailsObject();
    
    if (!detailsKey || !details) {
      return <div className="text-gray-600">No technical specifications available for this product.</div>;
    }
    
    return (
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(details).map(([key, value]) => {
          // Skip internal IDs
          if (key === 'id' || key === 'productId') return null;
          
          const label = formatLabel(key);
          const formattedValue = formatValue(key, value);
          
          return renderField(label, formattedValue);
        })}
      </div>
    );
  };

  /**
   * Handles the price update process
   * @param {number} percentageValue - Percentage to adjust the price by
   */
  const handlePriceUpdate = async (percentageValue: number) => {
    setIsUpdating(true);
    
    
    if (isNaN(percentageValue) || Math.abs(percentageValue) > 100) {
      setError('Percentage must be between -100 and 100');
      setIsUpdating(false);
      return;
    }
    
    if (product) {
      const newPrice = product.price * (1 + percentageValue / 100);
      
      
      if (newPrice <= 0) {
        setError('Price cannot be zero or negative');
        setIsUpdating(false);
        return;
      }
      
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

  /**
   * Handles the quantity update process
   * @param {number} changeAmount - Amount to add or remove from quantity
   */
  const handleQuantityUpdate = async (changeAmount: number) => {
    setIsUpdating(true);
    
    
    if (product) {
      let newQuantity: number;
      
      if (quantityAction === 'add') {
        newQuantity = product.quantity + changeAmount;
      } else {
        newQuantity = Math.max(0, product.quantity - changeAmount);
        if (newQuantity === 0 && product.quantity > 0 && changeAmount > product.quantity) {
          setError('Cannot remove more than the available quantity');
          setIsUpdating(false);
          return;
        }
      }
      
      try {
        await patchProduct.updateProductPrice(product.id, undefined, newQuantity);
        setCurrentQuantity(newQuantity);
        await refetch();
        setIsEditingQuantity(false);
      } catch (error) {
        console.error('Failed to update quantity:', error);
        setError('Failed to update quantity. Please try again.');
      } finally {
        setIsUpdating(false);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto mt-6">
      {/* Product name */}
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">{product.name}</h2>
      
      {/* Basic product information */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {renderField('Manufacturer', product.manufacturer)}
        {renderField('Price', `$${currentPrice.toFixed(2)}`)}
        {renderField('Stock', `${currentQuantity || 0} units`)}
        {renderField('Product Type', formatLabel(product.type))}
      </div>
      
      {/* Technical specifications */}
      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Technical Specifications</h3>
        {renderDetails()}
      </div>
      
      {/* Price modification controls */}
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
                min="-100"
                max="100"
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
      
      {/* Quantity modification controls */}
      <div className="mt-4 text-right flex justify-end items-center gap-4">
        {isEditingQuantity ? (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="flex border rounded overflow-hidden">
                <button
                  onClick={() => setQuantityAction('add')}
                  className={`px-3 py-1 ${quantityAction === 'add' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                  Add
                </button>
                <button
                  onClick={() => setQuantityAction('remove')}
                  className={`px-3 py-1 ${quantityAction === 'remove' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                  Remove
                </button>
              </div>
              <input
                type="number"
                value={quantityChange}
                onChange={(e) => setQuantityChange(e.target.value)}
                className={`w-20 px-2 py-1 border rounded ${isUpdating ? 'opacity-50 pointer-events-none' : ''}`}
                placeholder="Qty"
                disabled={isUpdating}
                min="1"
              />
              <button
                onClick={() => handleQuantityUpdate(parseInt(quantityChange))}
                disabled={isUpdating}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors disabled:bg-blue-300"
              >
                {isUpdating ? 'Updating...' : `${quantityAction === 'add' ? 'Add' : 'Remove'} Quantity`}
              </button>
              <button
                onClick={() => {
                  setCurrentQuantity(product.quantity);
                  setIsEditingQuantity(false);
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
            onClick={() => setIsEditingQuantity(true)}
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors flex items-center gap-2"
          >
            <span>Modify Quantity</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsContent;
