import React from 'react';
import { LineChart } from 'lucide-react';

const TradingViewChart = () => {
    return (
        <div className="w-full h-[450px] bg-[#161B22] border border-[#30363D] rounded-xl flex flex-col items-center justify-center p-4">
            <LineChart className="w-16 h-16 text-gray-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-500">TradingView Chart Placeholder</h3>
            <p className="text-sm text-gray-600">The full chart implementation will be loaded here.</p>
        </div>
    );
};

export default TradingViewChart;