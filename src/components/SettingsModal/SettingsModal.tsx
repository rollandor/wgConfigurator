import React from 'react';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (settings: VPNSettings) => void;
}

interface VPNSettings {
    serverAddress: string;
    port: number;
    protocol: string;
    encryption: string;
    autoReconnect: boolean;
    killSwitch: boolean;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
    isOpen,
    onClose,
    onSave,
}) => {
    const [settings, setSettings] = React.useState<VPNSettings>({
        serverAddress: 'vpn.example.com',
        port: 1194,
        protocol: 'UDP',
        encryption: 'AES-256-CBC',
        autoReconnect: false,
        killSwitch: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(settings);
    };

    if (!isOpen) {
        return null;
    }

    return (
        <div className="modal fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md p-6 mx-4">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">VPN Settings</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Server Address</label>
                        <input
                            type="text"
                            value={settings.serverAddress}
                            onChange={(e) => setSettings({ ...settings, serverAddress: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-700"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Port</label>
                        <input
                            type="number"
                            value={settings.port}
                            onChange={(e) => setSettings({ ...settings, port: parseInt(e.target.value) })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-700"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Protocol</label>
                        <select
                            value={settings.protocol}
                            onChange={(e) => setSettings({ ...settings, protocol: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-700"
                        >
                            <option>UDP</option>
                            <option>TCP</option>
                            <option>WireGuard</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Encryption</label>
                        <select
                            value={settings.encryption}
                            onChange={(e) => setSettings({ ...settings, encryption: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-700"
                        >
                            <option>AES-256-CBC</option>
                            <option>ChaCha20-Poly1305</option>
                            <option>Camellia-256-CBC</option>
                        </select>
                    </div>

                    <div>
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={settings.autoReconnect}
                                onChange={(e) => setSettings({ ...settings, autoReconnect: e.target.checked })}
                                className="rounded text-blue-500"
                            />
                            <span>Auto-reconnect</span>
                        </label>
                    </div>

                    <div>
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={settings.killSwitch}
                                onChange={(e) => setSettings({ ...settings, killSwitch: e.target.checked })}
                                className="rounded text-blue-500"
                            />
                            <span>Kill Switch</span>
                        </label>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Save Settings
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

SettingsModal.displayName = 'SettingsModal';