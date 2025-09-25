import React, { useEffect, useRef, memo } from 'react';

// Este componente encapsula el widget "Advanced Chart" de TradingView.
// Crea e inyecta dinámicamente el script de TradingView en el DOM.
const TradingViewWidget = ({ symbol }: { symbol: string }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const scriptAppended = useRef(false);

    useEffect(() => {
        const container = containerRef.current;
        if (!container || scriptAppended.current) {
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
        script.type = 'text/javascript';
        script.async = true;

        const widgetConfig = {
            "autosize": true,
            "symbol": symbol,
            "interval": "60",
            "timezone": "Etc/UTC",
            "theme": "dark",
            "style": "1",
            "locale": "es",
            "enable_publishing": false,
            "hide_side_toolbar": false, // <-- IMPORTANTE: Esto muestra la barra de herramientas.
            "allow_symbol_change": true,
            "calendar": false,
            "support_host": "https://www.tradingview.com",
            "studies": [
              "Volume@tv-basicstudies"
            ],
            "overrides": {
                "paneProperties.background": "#0a0a0a",
                "paneProperties.vertGridProperties.color": "#1f2937",
                "paneProperties.horzGridProperties.color": "#1f2937",
                "symbolWatermarkProperties.transparency": 90,
                "scalesProperties.textColor": "#9ca3af",
                "mainSeriesProperties.candleStyle.upColor": "#22c55e",
                "mainSeriesProperties.candleStyle.downColor": "#ef4444",
                "mainSeriesProperties.candleStyle.wickUpColor": "#22c55e",
                "mainSeriesProperties.candleStyle.wickDownColor": "#ef4444",
                "mainSeriesProperties.candleStyle.borderUpColor": "#22c55e",
                "mainSeriesProperties.candleStyle.borderDownColor": "#ef4444"
            }
        };
        
        script.innerHTML = JSON.stringify(widgetConfig);
        
        // Limpiamos antes de añadir el nuevo script para evitar duplicados
        container.innerHTML = ''; 
        container.appendChild(script);
        scriptAppended.current = true;

        // Cleanup function para el efecto.
        return () => {
             scriptAppended.current = false;
        }

    }, [symbol]);

    return (
        <div className="tradingview-widget-container h-full w-full" ref={containerRef}>
            {/* El widget de TradingView se inyectará aquí */}
        </div>
    );
};

export default memo(TradingViewWidget);