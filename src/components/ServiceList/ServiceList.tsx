import React, { useState } from 'react';
import { Service } from '../../providers/vpn.provider';
import { ServiceItem } from '../ServiceItem';

interface ServiceListProps {
    services: Service[];
    isProtected?: boolean;
    onAddService?: (service: Service) => void;
    onRemoveService?: (serviceId: string) => void;
    draggable?: boolean;
}

const categories = ['all', 'streaming', 'social', 'work', 'gaming'];

export const ServiceList: React.FC<ServiceListProps> = ({
    services,
    isProtected = false,
    onAddService,
    onRemoveService,
    draggable = false,
}) => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const filteredServices = services.filter(service => {
        const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
        const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleDragStart = (e: React.DragEvent, service: Service) => {
        e.dataTransfer.setData('text/plain', service.id);
    };

    return (
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">
                    {isProtected ? 'Services using VPN' : 'Available Services'}
                </h2>
                {!isProtected && (
                    <button
                        className="px-3 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    >
                        <i className="fas fa-plus mr-1"></i> Add Custom
                    </button>
                )}
            </div>

            {/* Categories Tabs */}
            <div className="mb-4 overflow-x-auto">
                <div className="flex space-x-1">
                    {categories.map(category => (
                        <button
                            key={category}
                            className={`tab-btn px-4 py-2 rounded ${activeCategory === category
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                                }`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            {/* Services List */}
            <div className="drop-zone grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-96 overflow-y-auto custom-scrollbar p-2">
                {filteredServices.map(service => (
                    <ServiceItem
                        key={service.id}
                        service={service}
                        isProtected={isProtected}
                        onAdd={() => onAddService?.(service)}
                        onRemove={() => onRemoveService?.(service.id)}
                        draggable={draggable}
                        onDragStart={(e) => handleDragStart(e, service)}
                    />
                ))}
            </div>
        </div>
    );
};

ServiceList.displayName = 'ServiceList';