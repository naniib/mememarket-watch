import React, { useEffect, useRef, memo } from 'react';
import { Maximize, Minimize } from 'lucide-react';
import type { Coin } from '../data';

declare global {
    interface Window {
        TradingView: any;
    }
}

interface ChartProps {
  coin: Coin;
  isChartFullscreen: boolean;
  setIsChartFullscreen: (isFullscreen: boolean) => void;
}

// Datafeed configuration for TradingView
const configurationData = {
    supported_resolutions: ['1', '5', '15', '30', '60', '1D', '1W', '1M'],
    exchanges: [{
        value: 'MemeMarket',
        name: 'MemeMarket',
        desc: 'MemeMarket Watch Exchange'
    }],
    symbols_types: [{
        name: 'crypto',
        value: 'crypto'
    }]
};

// Dark theme overrides for the chart
const darkThemeOverrides = {
    "paneProperties.background": "#0D1117",
    "paneProperties.vertGridProperties.color": "#161B22",
    "paneProperties.horzGridProperties.color": "#161B22",
    "symbolWatermarkProperties.transparency": 90,
    "scalesProperties.textColor": "#AAA",
    "mainSeriesProperties.candleStyle.upColor": "#10b981",
    "mainSeriesProperties.candleStyle.downColor": "#ef4444",
    "mainSeriesProperties.candleStyle.drawWick": true,
    "mainSeriesProperties.candleStyle.wickUpColor": "#10b981",
    "mainSeriesProperties.candleStyle.wickDownColor": "#ef4444",
};

// The TradingView Chart component
const Chart = ({ coin, isChartFullscreen, setIsChartFullscreen }: ChartProps) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const widgetRef = useRef<any>(null);

    useEffect(() => {
        if (!chartContainerRef.current || !('TradingView' in window)) {
            return;
        }
        
        const datafeed = {
             onReady: (callback: (config: any) => void) => {
                setTimeout(() => callback(configurationData));
            },
            resolveSymbol: (
                symbolName: string, 
                onSymbolResolvedCallback: (symbolInfo: any) => void, 
            ) => {
                 const symbolInfo = {
                    name: coin.symbol,
                    ticker: coin.symbol,
                    description: coin.name,
                    type: 'crypto',
                    session: '24x7',
                    timezone: 'Etc/UTC',
                    exchange: 'MemeMarket',
                    minmov: 1,
                    pricescale: 100000000,
                    has_intraday: true,
                    has_no_volume: false,
                    supported_resolutions: configurationData.supported_resolutions,
                    volume_precision: 2,
                    data_status: 'streaming',
                };
                setTimeout(() => onSymbolResolvedCallback(symbolInfo));
            },
             getBars: (
                symbolInfo: any, 
                resolution: string, 
                periodParams: any, 
                onHistoryCallback: (bars: any[], meta: any) => void, 
            ) => {
                const { countBack } = periodParams;
                 if (!countBack) {
                    onHistoryCallback([], { noData: true });
                    return;
                }
                 const resolutionToMs: { [key: string]: number } = {
                    '1': 60000, '5': 300000, '15': 900000, '30': 1800000, '60': 3600000,
                    '1D': 86400000, '1W': 604800000, '1M': 2592000000,
                };
                const intervalMs = resolutionToMs[resolution] || 3600000;

                const bars = [];
                let price = coin.price;
                let currentTime = Math.floor(Date.now() / intervalMs) * intervalMs;

                 for (let i = 0; i < countBack + 150; i++) { // Generate more bars for context
                    const volatility = price * 0.05; // 5% volatility per bar
                    const open = price;
                    const close = open + (Math.random() - 0.48) * volatility; // Slight bullish bias
                    const high = Math.max(open, close) + Math.random() * volatility * 0.5;
                    const low = Math.min(open, close) - Math.random() * volatility * 0.5;
                    const volume = (1 + Math.random()) * 100;

                    bars.push({ time: currentTime, open, high, low, close, volume });
                    price = Math.max(0.000001, close); // Prevent negative prices
                    currentTime -= intervalMs;
                }
                onHistoryCallback(bars.reverse(), { noData: false });
            },
            subscribeBars: () => {},
            unsubscribeBars: () => {},
        };

        const widgetOptions = {
            symbol: coin.symbol,
            datafeed: datafeed,
            interval: '15',
            container: chartContainerRef.current,
            library_path: '/charting_library/',
            locale: 'en',
            disabled_features: ['use_localstorage_for_settings', 'header_symbol_search', 'header_compare'],
            enabled_features: ['study_templates'],
            charts_storage_url: 'https://saveload.tradingview.com',
            charts_storage_api_version: '1.1',
            client_id: 'tradingview.com',
            user_id: 'public_user_id',
            fullscreen: false,
            autosize: true,
            theme: 'Dark' as 'Dark' | 'Light',
            overrides: darkThemeOverrides,
        };
        
        widgetRef.current = new window.TradingView.widget(widgetOptions);

        return () => {
            if (widgetRef.current) {
                widgetRef.current.remove();
                widgetRef.current = null;
            }
        };
    }, [coin]);

    return (
         <div className={`relative w-full border border-gray-700/30 rounded-lg overflow-hidden ${isChartFullscreen ? 'flex-grow' : 'h-[500px]'}`}>
            <div ref={chartContainerRef} className="w-full h-full" id="tv_chart_container" />
             <button
                onClick={() => setIsChartFullscreen(!isChartFullscreen)}
                className="absolute top-3 right-12 z-20 p-2 bg-gray-800/80 backdrop-blur-sm rounded-md text-gray-400 hover:text-white hover:bg-gray-700/80 transition-all"
                title={isChartFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            >
                {isChartFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}
            </button>
        </div>
    );
};

export default memo(Chart);