import { EnhancedEventEmitter } from './EnhancedEventEmitter';
import { HandlerFactory, HandlerInterface } from './handlers/HandlerInterface';
import { Producer, ProducerOptions } from './Producer';
import { Consumer, ConsumerOptions } from './Consumer';
import { DataProducer, DataProducerOptions } from './DataProducer';
import { DataConsumer, DataConsumerOptions } from './DataConsumer';
import { RtpParameters, MediaKind } from './RtpParameters';
import { SctpParameters, SctpStreamParameters } from './SctpParameters';
import { AppData } from './types';
export type TransportOptions<TransportAppData extends AppData = AppData> = {
    id: string;
    iceParameters: IceParameters;
    iceCandidates: IceCandidate[];
    dtlsParameters: DtlsParameters;
    sctpParameters?: SctpParameters;
    iceServers?: RTCIceServer[];
    iceTransportPolicy?: RTCIceTransportPolicy;
    additionalSettings?: any;
    proprietaryConstraints?: any;
    appData?: TransportAppData;
};
export type CanProduceByKind = {
    audio: boolean;
    video: boolean;
    [key: string]: boolean;
};
export type IceParameters = {
    /**
     * ICE username fragment.
     * */
    usernameFragment: string;
    /**
     * ICE password.
     */
    password: string;
    /**
     * ICE Lite.
     */
    iceLite?: boolean;
};
export type IceCandidate = {
    /**
     * Unique identifier that allows ICE to correlate candidates that appear on
     * multiple transports.
     */
    foundation: string;
    /**
     * The assigned priority of the candidate.
     */
    priority: number;
    /**
     * The IP address of the candidate.
     */
    ip: string;
    /**
     * The protocol of the candidate.
     */
    protocol: 'udp' | 'tcp';
    /**
     * The port for the candidate.
     */
    port: number;
    /**
     * The type of candidate.
     */
    type: 'host' | 'srflx' | 'prflx' | 'relay';
    /**
     * The type of TCP candidate.
     */
    tcpType?: 'active' | 'passive' | 'so';
};
export type DtlsParameters = {
    /**
     * Server DTLS role. Default 'auto'.
     */
    role?: DtlsRole;
    /**
     * Server DTLS fingerprints.
     */
    fingerprints: DtlsFingerprint[];
};
/**
 * The hash function algorithm (as defined in the "Hash function Textual Names"
 * registry initially specified in RFC 4572 Section 8) and its corresponding
 * certificate fingerprint value (in lowercase hex string as expressed utilizing
 * the syntax of "fingerprint" in RFC 4572 Section 5).
 */
export type DtlsFingerprint = {
    algorithm: string;
    value: string;
};
export type DtlsRole = 'auto' | 'client' | 'server';
export type ConnectionState = 'new' | 'connecting' | 'connected' | 'failed' | 'disconnected' | 'closed';
export type PlainRtpParameters = {
    ip: string;
    ipVersion: 4 | 6;
    port: number;
};
export type TransportEvents = {
    connect: [{
        dtlsParameters: DtlsParameters;
    }, () => void, (error: Error) => void];
    connectionstatechange: [ConnectionState];
    produce: [
        {
            kind: MediaKind;
            rtpParameters: RtpParameters;
            appData: AppData;
        },
        ({ id }: {
            id: string;
        }) => void,
        (error: Error) => void
    ];
    producedata: [
        {
            sctpStreamParameters: SctpStreamParameters;
            label?: string;
            protocol?: string;
            appData: AppData;
        },
        ({ id }: {
            id: string;
        }) => void,
        (error: Error) => void
    ];
};
export type TransportObserverEvents = {
    close: [];
    newproducer: [Producer];
    newconsumer: [Consumer];
    newdataproducer: [DataProducer];
    newdataconsumer: [DataConsumer];
};
export declare class Transport<TransportAppData extends AppData = AppData> extends EnhancedEventEmitter<TransportEvents> {
    private readonly _id;
    private _closed;
    private readonly _direction;
    private readonly _extendedRtpCapabilities;
    private readonly _canProduceByKind;
    private readonly _maxSctpMessageSize?;
    private readonly _handler;
    private _connectionState;
    private _appData;
    private readonly _producers;
    private readonly _consumers;
    private readonly _dataProducers;
    private readonly _dataConsumers;
    private _probatorConsumerCreated;
    private readonly _awaitQueue;
    private _pendingConsumerTasks;
    private _consumerCreationInProgress;
    private _pendingPauseConsumers;
    private _consumerPauseInProgress;
    private _pendingResumeConsumers;
    private _consumerResumeInProgress;
    private _pendingCloseConsumers;
    private _consumerCloseInProgress;
    protected readonly _observer: EnhancedEventEmitter<TransportObserverEvents>;
    constructor({ direction, id, iceParameters, iceCandidates, dtlsParameters, sctpParameters, iceServers, iceTransportPolicy, additionalSettings, proprietaryConstraints, appData, handlerFactory, extendedRtpCapabilities, canProduceByKind }: {
        direction: 'send' | 'recv';
        handlerFactory: HandlerFactory;
        extendedRtpCapabilities: any;
        canProduceByKind: CanProduceByKind;
    } & TransportOptions<TransportAppData>);
    /**
     * Transport id.
     */
    get id(): string;
    /**
     * Whether the Transport is closed.
     */
    get closed(): boolean;
    /**
     * Transport direction.
     */
    get direction(): 'send' | 'recv';
    /**
     * RTC handler instance.
     */
    get handler(): HandlerInterface;
    /**
     * Connection state.
     */
    get connectionState(): ConnectionState;
    /**
     * App custom data.
     */
    get appData(): TransportAppData;
    /**
     * App custom data setter.
     */
    set appData(appData: TransportAppData);
    get observer(): EnhancedEventEmitter;
    /**
     * Close the Transport.
     */
    close(): void;
    /**
     * Get associated Transport (RTCPeerConnection) stats.
     *
     * @returns {RTCStatsReport}
     */
    getStats(): Promise<RTCStatsReport>;
    /**
     * Restart ICE connection.
     */
    restartIce({ iceParameters }: {
        iceParameters: IceParameters;
    }): Promise<void>;
    /**
     * Update ICE servers.
     */
    updateIceServers({ iceServers }?: {
        iceServers?: RTCIceServer[];
    }): Promise<void>;
    /**
     * Create a Producer.
     */
    produce<ProducerAppData extends AppData = AppData>({ track, encodings, codecOptions, codec, stopTracks, disableTrackOnPause, zeroRtpOnPause, appData }?: ProducerOptions<ProducerAppData>): Promise<Producer<ProducerAppData>>;
    /**
     * Create a Consumer to consume a remote Producer.
     */
    consume<ConsumerAppData extends AppData = AppData>({ id, producerId, kind, rtpParameters, streamId, appData }: ConsumerOptions<ConsumerAppData>): Promise<Consumer<ConsumerAppData>>;
    /**
     * Create a DataProducer
     */
    produceData<DataProducerAppData extends AppData = AppData>({ ordered, maxPacketLifeTime, maxRetransmits, label, protocol, appData }?: DataProducerOptions<DataProducerAppData>): Promise<DataProducer<DataProducerAppData>>;
    /**
     * Create a DataConsumer
     */
    consumeData<ConsumerAppData extends AppData = AppData>({ id, dataProducerId, sctpStreamParameters, label, protocol, appData }: DataConsumerOptions<ConsumerAppData>): Promise<DataConsumer<ConsumerAppData>>;
    private createPendingConsumers;
    private pausePendingConsumers;
    private resumePendingConsumers;
    private closePendingConsumers;
    private handleHandler;
    private handleProducer;
    private handleConsumer;
    private handleDataProducer;
    private handleDataConsumer;
}
//# sourceMappingURL=Transport.d.ts.map