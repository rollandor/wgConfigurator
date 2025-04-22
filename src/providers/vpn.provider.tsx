import React, { createContext, useContext, useState, ReactNode, FC, PropsWithChildren } from 'react';

export interface Service {
  id: string;
  name: string;
  category: string;
  icon?: string;
}

interface VPNContextType {
  isConnected: boolean;
  connectionStatus: 'disconnected' | 'connecting' | 'connected';
  protectedServices: Service[];
  toggleConnection: () => void;
  addService: (service: Service) => void;
  removeService: (serviceId: string) => void;
}

const VPNContext = createContext<VPNContextType | undefined>(undefined);

export const useVPN = () => {
  const context = useContext(VPNContext);
  if (!context) {
    throw new Error('useVPN must be used within a VPNProvider');
  }
  return context;
};

export type TConnectionStatus = 'disconnected' | 'connecting' | 'connected';

export const VPNProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<TConnectionStatus>('disconnected');
  const [protectedServices, setProtectedServices] = useState<Service[]>([]);

  const toggleConnection = () => {
    if (!isConnected) {
      setIsConnected(true);
      setConnectionStatus('connecting');
      
      // Simulate connection
      setTimeout(() => {
        if (isConnected) {
          setConnectionStatus('connected');
        }
      }, 3000);
    } else {
      setIsConnected(false);
      setConnectionStatus('disconnected');
    }
  };

  const addService = (service: Service) => {
    setProtectedServices(prev => [...prev, service]);
  };

  const removeService = (serviceId: string) => {
    setProtectedServices(prev => prev.filter(service => service.id !== serviceId));
  };

  return (
    <VPNContext.Provider value={{
      isConnected,
      connectionStatus,
      protectedServices,
      toggleConnection,
      addService,
      removeService
    }}>
      {children}
    </VPNContext.Provider>
  );
}; 