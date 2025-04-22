import React from 'react';
import { Service } from '../../providers/vpn.provider';

interface ServiceItemProps {
    service: Service;
    isProtected?: boolean;
    onAdd?: () => void;
    onRemove?: () => void;
    draggable?: boolean;
    onDragStart?: (e: React.DragEvent) => void;
    onDragEnd?: (e: React.DragEvent) => void;
}

export const ServiceItem: React.FC<ServiceItemProps> = ({
    service,
    onAdd,
    onRemove,
    onDragStart,
    onDragEnd,
    draggable = false,
    isProtected = false,
}) => {
    return (
        <div
            className="service-item draggable p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
            draggable={draggable}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            data-service-id={service.id}
        >
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <img
                        src={service.icon || 'https://via.placeholder.com/30'}
                        alt={service.name}
                        className="w-6 h-6 rounded"
                    />
                    <span>{service.name}</span>
                </div>
                {isProtected ? (
                    <button
                        onClick={onRemove}
                        className="remove-btn p-1 text-red-500 hover:text-red-700"
                    >
                        <i className="fas fa-trash-alt"></i>
                    </button>
                ) : (
                    <button
                        onClick={onAdd}
                        className="add-btn p-1 text-blue-500 hover:text-blue-700"
                    >
                        <i className="fas fa-arrow-right"></i>
                    </button>
                )}
            </div>
        </div>
    );
};

ServiceItem.displayName = 'ServiceItem';