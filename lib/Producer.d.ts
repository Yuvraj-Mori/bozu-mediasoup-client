import { EnhancedEventEmitter } from './EnhancedEventEmitter';
import { MediaKind, RtpCodecCapability, RtpParameters, RtpEncodingParameters } from './RtpParameters';
import { AppData } from './types';
export type ProducerOptions<ProducerAppData extends AppData = AppData> = {
    track?: MediaStreamTrack;
    encodings?: RtpEncodingParameters[];
    codecOptions?: ProducerCodecOptions;
    codec?: RtpCodecCapability;
    stopTracks?: boolean;
    disableTrackOnPause?: boolean;
    zeroRtpOnPause?: boolean;
    appData?: ProducerAppData;
};
export type ProducerCodecOptions = {
    opusStereo?: boolean;
    opusFec?: boolean;
    opusDtx?: boolean;
    opusMaxPlaybackRate?: number;
    opusMaxAverageBitrate?: number;
    opusPtime?: number;
    opusNack?: boolean;
    videoGoogleStartBitrate?: number;
    videoGoogleMaxBitrate?: number;
    videoGoogleMinBitrate?: number;
};
export type ProducerEvents = {
    transportclose: [];
    trackended: [];
    '@pause': [
        () => void,
        (error: Error) => void
    ];
    '@resume': [
        () => void,
        (error: Error) => void
    ];
    '@replacetrack': [
        MediaStreamTrack | null,
        () => void,
        (error: Error) => void
    ];
    '@setmaxspatiallayer': [
        number,
        () => void,
        (error: Error) => void
    ];
    '@setrtpencodingparameters': [
        RTCRtpEncodingParameters,
        () => void,
        (error: Error) => void
    ];
    '@getstats': [(stats: RTCStatsReport) => void, (error: Error) => void];
    '@close': [];
};
export type ProducerObserverEvents = {
    close: [];
    pause: [];
    resume: [];
    trackended: [];
};
export declare class Producer<ProducerAppData extends AppData = AppData> extends EnhancedEventEmitter<ProducerEvents> {
    private readonly _id;
    private readonly _localId;
    private _closed;
    private readonly _rtpSender?;
    private _track;
    private readonly _kind;
    private readonly _rtpParameters;
    private _paused;
    private _maxSpatialLayer;
    private _stopTracks;
    private _disableTrackOnPause;
    private _zeroRtpOnPause;
    private _appData;
    protected readonly _observer: EnhancedEventEmitter<ProducerObserverEvents>;
    constructor({ id, localId, rtpSender, track, rtpParameters, stopTracks, disableTrackOnPause, zeroRtpOnPause, appData }: {
        id: string;
        localId: string;
        rtpSender?: RTCRtpSender;
        track: MediaStreamTrack;
        rtpParameters: RtpParameters;
        stopTracks: boolean;
        disableTrackOnPause: boolean;
        zeroRtpOnPause: boolean;
        appData?: ProducerAppData;
    });
    /**
     * Producer id.
     */
    get id(): string;
    /**
     * Local id.
     */
    get localId(): string;
    /**
     * Whether the Producer is closed.
     */
    get closed(): boolean;
    /**
     * Media kind.
     */
    get kind(): MediaKind;
    /**
     * Associated RTCRtpSender.
     */
    get rtpSender(): RTCRtpSender | undefined;
    /**
     * The associated track.
     */
    get track(): MediaStreamTrack | null;
    /**
     * RTP parameters.
     */
    get rtpParameters(): RtpParameters;
    /**
     * Whether the Producer is paused.
     */
    get paused(): boolean;
    /**
     * Max spatial layer.
     *
     * @type {Number | undefined}
     */
    get maxSpatialLayer(): number | undefined;
    /**
     * App custom data.
     */
    get appData(): ProducerAppData;
    /**
     * App custom data setter.
     */
    set appData(appData: ProducerAppData);
    get observer(): EnhancedEventEmitter;
    /**
     * Closes the Producer.
     */
    close(): void;
    /**
     * Transport was closed.
     */
    transportClosed(): void;
    /**
     * Get associated RTCRtpSender stats.
     */
    getStats(): Promise<RTCStatsReport>;
    /**
     * Pauses sending media.
     */
    pause(): void;
    /**
     * Resumes sending media.
     */
    resume(): void;
    /**
     * Replaces the current track with a new one or null.
     */
    replaceTrack({ track }: {
        track: MediaStreamTrack | null;
    }): Promise<void>;
    /**
     * Sets the video max spatial layer to be sent.
     */
    setMaxSpatialLayer(spatialLayer: number): Promise<void>;
    setRtpEncodingParameters(params: RTCRtpEncodingParameters): Promise<void>;
    private onTrackEnded;
    private handleTrack;
    private destroyTrack;
}
//# sourceMappingURL=Producer.d.ts.map