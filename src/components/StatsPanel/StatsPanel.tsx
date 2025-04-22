import React from 'react';

interface StatsPanelProps {
    protectedCount: number;
    trafficVolume: string;
}

export const StatsPanel: React.FC<StatsPanelProps> = ({
    protectedCount,
    trafficVolume,
}) => {
    return (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-md font-semibold mb-2">VPN Usage Statistics</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-blue-50 dark:bg-blue-900 bg-opacity-50 p-3 rounded-lg">
                    <div className="text-blue-500 dark:text-blue-300">Services Protected</div>
                    <div className="text-lg font-bold">{protectedCount}</div>
                </div>
                <div className="bg-green-50 dark:bg-green-900 bg-opacity-50 p-3 rounded-lg">
                    <div className="text-green-500 dark:text-green-300">Traffic Last 24h</div>
                    <div className="text-lg font-bold">{trafficVolume}</div>
                </div>
            </div>
        </div>
    );
};

StatsPanel.displayName = 'StatsPanel';