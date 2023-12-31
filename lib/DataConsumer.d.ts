import { EnhancedEventEmitter } from './EnhancedEventEmitter';
import { SctpStreamParameters } from './SctpParameters';
import { AppData } from './types';
export type DataConsumerOptions<DataConsumerAppData extends AppData = AppData> = {
    id?: string;
    dataProducerId?: string;
    sctpStreamParameters: SctpStreamParameters;
    label?: string;
    protocol?: string;
    appData?: DataConsumerAppData;
};
export type DataConsumerEvents = {
    transportclose: [];
    open: [];
    error: [Error];
    close: [];
    message: [any];
    '@close': [];
};
export type DataConsumerObserverEvents = {
    close: [];
};
export declare class DataConsumer<DataConsumerAppData extends AppData = AppData> extends EnhancedEventEmitter<DataConsumerEvents> {
    private readonly _id;
    private readonly _dataProducerId;
    private readonly _dataChannel;
    private _closed;
    private readonly _sctpStreamParameters;
    private _appData;
    protected readonly _observer: EnhancedEventEmitter<DataConsumerObserverEvents>;
    constructor({ id, dataProducerId, dataChannel, sctpStreamParameters, appData }: {
        id: string;
        dataProducerId: string;
        dataChannel: RTCDataChannel;
        sctpStreamParameters: SctpStreamParameters;
        appData?: DataConsumerAppData;
    });
    /**
     * DataConsumer id.
     */
    get id(): string;
    /**
     * Associated DataProducer id.
     */
    get dataProducerId(): string;
    /**
     * Whether the DataConsumer is closed.
     */
    get closed(): boolean;
    /**
     * SCTP stream parameters.
     */
    get sctpStreamParameters(): SctpStreamParameters;
    /**
     * DataChannel readyState.
     */
    get readyState(): RTCDataChannelState;
    /**
     * DataChannel label.
     */
    get label(): string;
    /**
     * DataChannel protocol.
     */
    get protocol(): string;
    /**
     * DataChannel binaryType.
     */
    get binaryType(): BinaryType;
    /**
     * Set DataChannel binaryType.
     */
    set binaryType(binaryType: BinaryType);
    /**
     * App custom data.
     */
    get appData(): DataConsumerAppData;
    /**
     * App custom data setter.
     */
    set appData(appData: DataConsumerAppData);
    get observer(): EnhancedEventEmitter;
    /**
     * Closes the DataConsumer.
     */
    close(): void;
    /**
     * Transport was closed.
     */
    transportClosed(): void;
    private handleDataChannel;
}
//# sourceMappingURL=DataConsumer.d.ts.map