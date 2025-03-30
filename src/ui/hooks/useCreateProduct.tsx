import { useState } from 'react';
import { AxiosError } from 'axios';
import axiosInstance from '../misch/Axios';

// Base product interface
interface BaseProduct {
  name: string;
  manufacturer: string;
  type: 'PROCESSOR' | 'MEMORY' | 'HARDDRIVE' | 'VIDEOCARD' | 'MOTHERBOARD' | 'CPUCOOLER' | 'POWERSUPPLY' | 'POWERHOUSE';
  price: number;
  couantity: number;
  imgSrc: string;
}

// Processor interface
interface Processor extends BaseProduct {
  coreNumber: number;
  baseFrequency: number;
  turboBoostFrequency: number;
  cache: number;
  architecture: string;
  processorSeller: string;
  processorModel: string;
  integratedGraphicModel: string;
  processorTechnology: string;
}

// Memory interface
interface Memory extends BaseProduct {
  memoryCapacity: number;
  memoryType: string;
  installedMemory: number;
  frequency: number;
  supportedMemoryCapacity: number;
}

// HardDrive interface
interface HardDrive extends BaseProduct {
  capacity: number;
  storageType: string;
  connectionInterface: string;
  readingSpeed: number;
  writingSpeed: number;
  nandFlashType: string;
  pciGeneration: number;
}

// VideoCard interface
interface VideoCard extends BaseProduct {
  videoChipset: string;
  producer: string;
  cpuSocket: string;
  coolingType: string;
  graphicChipSpeed: number;
  graphicMemorySpeed: number;
  memoryCapacity: number;
  bandwidth: number;
  suggestedPower: number;
  displayPort: number;
  size: string;
}

// Motherboard interface
interface Motherboard extends BaseProduct {
  cpuSocket: string;
  chipset: string;
  memoryType: string;
  processorSeller: string;
  graphicCard: string;
  hdmi: boolean;
  sataConnectors: number;
  pciConnectors: number;
  usbPorts: number;
  memorySockets: number;
  integratedSound: boolean;
  bluetooth: boolean;
  wireless: boolean;
  sizeStandard: string;
}


interface CPUCooler extends BaseProduct {
  fanSpeed: number;
  basetype: string;
  airflow: number;
  frequency: number;
}


interface PowerSupply extends BaseProduct {
  performance: number;
  fourPinConnector: boolean;
  sixPinVGA: boolean;
  size: string;
}


interface Powerhouse extends BaseProduct {
  motherboardType: string;
  fans: number;
  size: string;
}


type ProductType = 
  | Processor 
  | Memory 
  | HardDrive 
  | VideoCard 
  | Motherboard 
  | CPUCooler 
  | PowerSupply 
  | Powerhouse;

const useCreateProduct = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const formatProductData = (productData: ProductType) => {
    console.log('Original Product Data:', productData);

    const { type, name, manufacturer, price, couantity, imgSrc, ...specificFields } = productData;
    
   
    const baseProduct = {
      name,
      manufacturer,
      type,
      price,
      couantity,
      imgSrc
    };

    const productTypeMapping: { [key: string]: string } = {
      'PROCESSOR': 'Processor',
      'MEMORY': 'Memory',
      'HARDDRIVE': 'HardDrive',
      'VIDEOCARD': 'VideoCard',
      'MOTHERBOARD': 'Motherboard',
      'CPUCOOLER': 'CPUCooler',
      'POWERSUPPLY': 'PowerSupply',
      'POWERHOUSE': 'Powerhouse'
    };

    const productTypeKey = productTypeMapping[type] || type;


    const isCPUCooler = (obj: any): obj is CPUCooler => 
      type === 'CPUCOOLER' && 'basetype' in obj;


    const formattedSpecificFields = isCPUCooler(specificFields)
      ? { 
          ...specificFields,
          type: specificFields.basetype,
          basetype: undefined
        }
      : specificFields;

  
    const formattedData = {
      ...baseProduct,
      [productTypeKey]: formattedSpecificFields
    };

    console.log('Formatted Product Data:', formattedData);
    return formattedData;
  };

  const createProduct = async (productData: ProductType) => {
    setLoading(true);
    setError(null);

    try {
      const formattedData = formatProductData(productData);
      console.log('Sending Product Data:', formattedData);
      
      const response = await axiosInstance.post('/product', formattedData);
      return response.data;
    } catch (err) {
      console.error('Product Creation Error:', err);

      if (err instanceof AxiosError) {
        if (err.code === 'ERR_NETWORK') {
          setError("Network error: Unable to connect to the server");
        } else if (err.response) {
          console.error('Server Response:', err.response);
          switch (err.response.status) {
            case 400:
              setError("Invalid product data");
              break;
              case 401:
                
                break
            case 500:
              setError("Server error");
              break;
            default:
              setError(`Error: ${err.response.status}`);
          }
        }
      } else {
        setError("An unexpected error occurred");
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    createProduct,
    loading,
    error
  };
};

export default useCreateProduct;