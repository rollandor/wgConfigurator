import React from 'react';
import { Service } from '../../providers/vpn.provider';
import { ServiceList } from '../ServiceList';

interface VPNColumnProps {
  services: Service[];
  onRemoveService: (serviceId: string) => void;
}

export const VPNColumn: React.FC<VPNColumnProps> = ({
  services,
  onRemoveService,
}) => {
  return (
    <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <ServiceList
        services={services}
        isProtected
        onRemoveService={onRemoveService}
        draggable
      />
    </div>
  );
}; 

VPNColumn.displayName = 'VPNColumn';