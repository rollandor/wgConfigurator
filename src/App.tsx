import React, { useState } from 'react';
import { ThemeProvider } from './providers/theme.provider';
import { VPNProvider } from './providers/vpn.provider';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { ServiceList } from './components/ServiceList';
import { VPNColumn } from './components/VPNColumn';
import { StatsPanel } from './components/StatsPanel';
import { SettingsModal } from './components/SettingsModal';
import { AddCustomDomainModal } from './components/AddCustomDomainModal';
import { Service } from './providers/vpn.provider';

const initialServices: Service[] = [
  { id: 'netflix', name: 'Netflix', category: 'streaming' },
  { id: 'youtube', name: 'YouTube', category: 'streaming' },
  { id: 'telegram', name: 'Telegram', category: 'social' },
  { id: 'gmail', name: 'Gmail', category: 'work' },
  { id: 'whatsapp', name: 'WhatsApp', category: 'social' },
  { id: 'github', name: 'GitHub', category: 'work' },
  { id: 'steam', name: 'Steam', category: 'gaming' },
  { id: 'twitter', name: 'Twitter', category: 'social' },
];

const App: React.FC = () => {
  const [services, setServices] = useState<Service[]>(initialServices);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isCustomDomainOpen, setIsCustomDomainOpen] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAddService = (service: Service) => {
    setServices(prev => [...prev, service]);
  };

  const handleRemoveService = (serviceId: string) => {
    setServices(prev => prev.filter(service => service.id !== serviceId));
  };

  const handleSaveSettings = (settings: any) => {
    // Handle saving VPN settings
    console.log('Saving settings:', settings);
    setIsSettingsOpen(false);
  };

  const handleAddCustomDomain = (domain: string, name: string, category: string) => {
    const newService: Service = {
      id: `custom-${Date.now()}`,
      name: name || domain,
      category,
    };
    handleAddService(newService);
    setIsCustomDomainOpen(false);
  };

  return (
    <ThemeProvider>
      <VPNProvider>
        <div className="container mx-auto px-4 py-6">
          <Header onSettingsClick={() => setIsSettingsOpen(true)} />
          <SearchBar onSearch={handleSearch} />

          <div className="flex flex-col lg:flex-row gap-6">
            <ServiceList
              services={services}
              onAddService={handleAddService}
              draggable
            />
            <VPNColumn
              services={services}
              onRemoveService={handleRemoveService}
            />
          </div>

          <StatsPanel
            protectedCount={services.length}
            trafficVolume="1.2 GB"
          />

          <SettingsModal
            isOpen={isSettingsOpen}
            onClose={() => setIsSettingsOpen(false)}
            onSave={handleSaveSettings}
          />

          <AddCustomDomainModal
            isOpen={isCustomDomainOpen}
            onClose={() => setIsCustomDomainOpen(false)}
            onAdd={handleAddCustomDomain}
          />
        </div>
      </VPNProvider>
    </ThemeProvider>
  );
};

export default App;
