import React from 'react';
import { useTheme } from '../../providers/theme.provider';
import { useVPN } from '../../providers/vpn.provider';

interface HeaderProps {
  onSettingsClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onSettingsClick }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { isConnected, connectionStatus, toggleConnection } = useVPN();

  const getStatusText = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'VPN: Connected';
      case 'connecting':
        return 'VPN: Connecting...';
      default:
        return 'VPN: Disconnected';
    }
  };

  return (
    <header className="flex justify-between items-center mb-8 p-4 rounded-lg bg-white dark:bg-gray-800 shadow-md">
      <div className="flex items-center space-x-2">
        <i className="fas fa-shield-alt text-blue-500 text-2xl"></i>
        <h1 className="text-xl md:text-2xl font-bold">VPN Selector</h1>
      </div>

      <div className="flex items-center space-x-4">
        {/* Theme Toggle */}
        <div className="flex items-center">
          <span className="mr-2 text-sm hidden md:block">Dark Mode</span>
          <div className="relative inline-block w-12 mr-2 align-middle select-none">
            <input
              type="checkbox"
              name="toggle"
              id="themeToggle"
              className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              checked={isDarkMode}
              onChange={toggleTheme}
            />
            <label
              htmlFor="themeToggle"
              className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
            ></label>
          </div>
        </div>

        {/* VPN Toggle */}
        <div className="flex items-center space-x-2">
          <span id="vpnStatus" className="hidden md:inline-block">
            {getStatusText()}
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              id="vpnToggle"
              className="sr-only peer"
              checked={isConnected}
              onChange={toggleConnection}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Settings Button */}
        <button
          onClick={onSettingsClick}
          className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          <i className="fas fa-cog"></i>
          <span className="hidden md:inline ml-1">Settings</span>
        </button>
      </div>
    </header>
  );
}; 

Header.displayName = 'Header';