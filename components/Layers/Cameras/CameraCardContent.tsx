import React from 'react';
import { Header } from 'components/UI/Card/components/Header/Header';
import { Section } from 'components/UI/Card/components/Section/Section';
import { VideoPlayer } from 'components/Player/VideoPlayer';
import styles from 'styles/CardContent.module.css';
import { CameraFeature } from './camera';

type Props = {
    placemark?: CameraFeature;
};

export function CameraCardContent({ placemark }: Props) {
    if (!placemark) return null;

    return (
        <div className={styles.popup}>
            <Header
                coordinates={placemark.geometry.coordinates}
                title={placemark.properties.address}
                description={placemark.properties.directionDescription}
            />
            <Section>
                <VideoPlayer streamUrl={placemark.properties.streamHlsUrl} />
            </Section>
        </div>
    );
}
