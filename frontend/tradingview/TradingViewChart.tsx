import React, { useEffect, useRef } from 'react';
import datafeed from './datafeed';

// Extend the Window interface to include the TradingView property
declare global {
  interface Window {
    TradingView: any;
  }
}

const TradingViewChart = () => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const widgetRef = useRef<any>(null);

    useEffect(() => {
        const createWidget = () => {
            if (!chartContainerRef.current || widgetRef.current) {
                return;
            }

            const widgetOptions = {
                symbol: 'DOGE2/USD', // default symbol
                interval: '15', // default interval
                container: chartContainerRef.current,
                datafeed: datafeed,
                library_path: '/charting_library/',
                locale: 'en',
                disabled_features: ['use_localstorage_for_settings'],
                enabled_features: ['study_templates'],
                charts_storage_url: 'https://saveload.tradingview.com',
                charts_storage_api_version: '1.1',
                client_id: 'tradingview.com',
                user_id: 'public_user_id',
                fullscreen: false,
                autosize: true,
                studies_overrides: {},
                theme: 'dark', // Using dark theme
                // --- Dark Theme Customization ---
                overrides: {
                    "paneProperties.background": "#0a0a0a",
                    "paneProperties.vertGridProperties.color": "#1a1a1a",
                    "paneProperties.horzGridProperties.color": "#1a1a1a",
                    "symbolWatermarkProperties.transparency": 90,
                    "scalesProperties.textColor": "#AAA",
                    "mainSeriesProperties.candleStyle.upColor": "#22c55e",
                    "mainSeriesProperties.candleStyle.downColor": "#ef4444",
                    "mainSeriesProperties.candleStyle.wickUpColor": "#22c55e",
                    "mainSeriesProperties.candleStyle.wickDownColor": "#ef4444",
                    "mainSeriesProperties.candleStyle.borderUpColor": "#22c55e",
                    "mainSeriesProperties.candleStyle.borderDownColor": "#ef4444",
                },
            };
            
            // Check if the TradingView library is available
            if (typeof window.TradingView !== 'undefined') {
                const tvWidget = new window.TradingView.widget(widgetOptions);
                widgetRef.current = tvWidget;

                tvWidget.onChartReady(() => {
                    console.log('TradingView Chart is ready');
                });
            } else {
                console.error("TradingView library not found. Make sure the script is loaded.");
            }
        };

        // Ensure the library is loaded before creating the widget
        if (document.readyState === 'complete') {
            createWidget();
        } else {
            window.addEventListener('load', createWidget);
        }
        
        return () => {
            // Cleanup widget on component unmount
            if (widgetRef.current) {
                widgetRef.current.remove();
                widgetRef.current = null;
            }
            window.removeEventListener('load', createWidget);
        };
    }, []);

    return (
        <div ref={chartContainerRef} className="w-full h-full" id="tv_chart_container"></div>
    );
};

export default TradingViewChart;