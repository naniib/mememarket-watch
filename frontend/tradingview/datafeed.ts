// frontend/tradingview/datafeed.ts

/**
 * This is a basic datafeed implementation for the TradingView charting library.
 * It uses mock data to display a chart and satisfies the IDatafeedChartApi interface.
 */

// --- Type Definitions (mimicking TradingView's Charting Library API) ---

interface SymbolInfo {
    name: string;
    'full_name': string;
    description: string;
    type: string;
    session: string;
    exchange: string;
    listed_exchange: string;
    timezone: string;
    format: 'price';
    pricescale: number;
    minmov: number;
    has_intraday: boolean;
    has_no_volume: boolean;
    supported_resolutions: string[];
    ticker?: string;
}

interface Bar {
    time: number; // UTC timestamp in milliseconds
    open: number;
    high: number;
    low: number;
    close: number;
    volume?: number;
}

type OnReadyCallback = (configuration: DatafeedConfiguration) => void;
type ResolveCallback = (symbolInfo: SymbolInfo) => void;
type HistoryCallback = (bars: Bar[], meta: { noData: boolean }) => void;
type ErrorCallback = (reason: string) => void;

interface DatafeedConfiguration {
    supports_marks?: boolean;
    supports_timescale_marks?: boolean;
    supports_time?: boolean;
    supported_resolutions?: string[];
}

interface IDatafeedChartApi {
    onReady: (callback: OnReadyCallback) => void;
    searchSymbols: (
        userInput: string,
        exchange: string,
        symbolType: string,
        onResultReady: (symbols: any[]) => void
    ) => void;
    resolveSymbol: (
        symbolName: string,
        onSymbolResolvedCallback: ResolveCallback,
        onResolveErrorCallback: ErrorCallback
    ) => void;
    getBars: (
        symbolInfo: SymbolInfo,
        resolution: string,
        periodParams: { from: number, to: number, firstDataRequest: boolean, countBack?: number },
        onHistoryCallback: HistoryCallback,
        onErrorCallback: ErrorCallback
    ) => void;
    subscribeBars: (
        symbolInfo: SymbolInfo,
        resolution: string,
        onRealtimeCallback: (bar: Bar) => void,
        subscriberUID: string,
        onResetCacheNeededCallback: () => void
    ) => void;
    unsubscribeBars: (subscriberUID: string) => void;
}

// --- Datafeed Implementation ---

const datafeed: IDatafeedChartApi = {
    /**
     * Called by the charting library to get configuration data.
     */
    onReady: (callback: OnReadyCallback) => {
        console.log('[Datafeed] onReady called');
        setTimeout(() => callback({
            supported_resolutions: ['1', '5', '15', '30', '60', 'D', 'W', 'M'],
        }), 0);
    },

    /**
     * Called by the charting library to resolve a symbol.
     */
    resolveSymbol: (
        symbolName: string,
        onSymbolResolvedCallback: ResolveCallback,
        onResolveErrorCallback: ErrorCallback
    ) => {
        console.log(`[Datafeed] resolveSymbol called with: ${symbolName}`);
        const symbolInfo: SymbolInfo = {
            name: 'DOGE2/USD',
            'full_name': 'Doge2Moon/USD',
            ticker: 'DOGE2/USD',
            description: 'Doge2Moon to US Dollar',
            type: 'crypto',
            session: '24x7',
            exchange: 'MemeMarket',
            listed_exchange: 'MemeMarket',
            timezone: 'Etc/UTC',
            format: 'price',
            pricescale: 100000000, // For prices like 0.00123456
            minmov: 1,
            has_intraday: true,
            has_no_volume: false,
            supported_resolutions: ['1', '5', '15', '30', '60', 'D', 'W', 'M'],
        };
        setTimeout(() => onSymbolResolvedCallback(symbolInfo), 0);
    },

    /**
     * Called by the charting library to get historical data.
     */
    getBars: (
        symbolInfo: SymbolInfo,
        resolution: string,
        periodParams: { from: number, to: number, firstDataRequest: boolean },
        onHistoryCallback: HistoryCallback,
        onErrorCallback: ErrorCallback
    ) => {
        console.log(`[Datafeed] getBars called for ${symbolInfo.name}, resolution ${resolution}`);
        
        const bars: Bar[] = [];
        // Use the 'to' timestamp from the request as the starting point for mock data
        let currentTime = periodParams.to * 1000;
        let currentPrice = 0.001234;

        // Generate 150 bars of mock data
        for (let i = 0; i < 150; i++) {
            const time = currentTime - (i * 60 * 1000); // 1-minute bars for example
            
            const open = currentPrice;
            const fluctuation = (Math.random() - 0.48) * open * 0.1; // More volatile swings
            const close = open + fluctuation;
            const high = Math.max(open, close) + Math.random() * open * 0.05;
            const low = Math.min(open, close) - Math.random() * open * 0.05;
            const volume = Math.random() * 10000 + 5000;

            bars.push({
                time: time,
                open: open,
                high: high,
                low: low,
                close: close,
                volume: volume,
            });
            
            currentPrice = close > 0.000001 ? close : 0.000001; // Prevent price from becoming zero or negative
        }
        
        // Data must be sorted in ascending order (older first)
        const sortedBars = bars.sort((a, b) => a.time - b.time);

        console.log(`[Datafeed] Returning ${sortedBars.length} bars`);
        setTimeout(() => onHistoryCallback(sortedBars, { noData: false }), 0);
    },

    /**
     * Called by the charting library to search for symbols.
     */
    searchSymbols: (userInput, exchange, symbolType, onResultReady) => {
        console.log('[Datafeed] searchSymbols called');
        onResultReady([]); // Keep empty as we only have one symbol
    },

    /**
     * Called by the charting library to subscribe to real-time data.
     */
    subscribeBars: (symbolInfo, resolution, onRealtimeCallback, subscriberUID, onResetCacheNeededCallback) => {
        console.log(`[Datafeed] subscribeBars called for ${subscriberUID}`);
        // This is where you would connect to a WebSocket for real-time data.
    },

    /**
     * Called by the charting library to unsubscribe from real-time data.
     */
    unsubscribeBars: (subscriberUID) => {
        console.log(`[Datafeed] unsubscribeBars called for ${subscriberUID}`);
        // This is where you would disconnect from the WebSocket.
    },
};

export default datafeed;