import React, { useEffect, useRef } from 'react';

// Declaramos el objeto 'TradingView' en el scope global para que TypeScript no se queje
declare const TradingView: any;

const TradingViewChart = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Nos aseguramos de que la librería y el contenedor existan
    if (chartContainerRef.current && typeof TradingView !== 'undefined') {
      const widget = new TradingView.widget({
        autosize: true,
        symbol: "SOLUSD", // Símbolo de ejemplo
        interval: "D",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "es",
        enable_publishing: false,
        allow_symbol_change: true,
        container_id: chartContainerRef.current.id,
      });
    }
  }, []);

  // Damos un ID único al contenedor para que la librería sepa dónde dibujar el gráfico
  return (
    <div 
      id="tradingview_chart_container" 
      ref={chartContainerRef} 
      className="w-full h-full"
    />
  );
};

export default TradingViewChart;