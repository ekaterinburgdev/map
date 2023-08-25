/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/media-has-caption */
import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface Props {
    streamUrl: string;
}

export function VideoPlayer({ streamUrl }: Props) {
    const videoRef = useRef(null);
    const hlsRef = useRef(null);

    useEffect(() => {
        if (Hls.isSupported()) {
            hlsRef.current = new Hls({
                maxLiveSyncPlaybackRate: 1.5,
            });
            hlsRef.current.loadSource(streamUrl);
            hlsRef.current.attachMedia(videoRef.current);
        } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
            videoRef.current.src = streamUrl;
        }

        return () => {
            if (hlsRef.current) {
                hlsRef.current.destroy();
            }
        };
    }, [streamUrl]);

    return <video ref={videoRef} controls autoPlay playsInline muted />;
}
