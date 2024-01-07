import { useContext, useEffect, useMemo, useState } from 'react';
import { useMap } from 'react-map-gl';
import { HouseObject } from 'features/Buildings/houseBase';
import { MapContext } from 'features/Map/providers/MapProvider';
import { usePopup } from 'features/Map/providers/usePopup';
import { ConstructionInfo } from 'components/Card/components/ConstructionInfo/ConstructionInfo';
import Facade from 'features/Facade/CardContent/Facade';
import { Header } from 'components/Card/components/Header/Header';
import { Info } from 'components/Card/components/Info/Info';
import { Label } from 'shared/UI/Label/Label';
import { Section } from 'components/Card/components/Section/Section';
import { Sources } from 'components/Card/components/Sources/Sources';
import { EditObjectButtonLink } from 'features/EditObjectButtonLink/EditObjectButtonLink';
import { FilterLoader } from 'shared/UI/Loader/FilterLoader';
import { getLatLngFromHash } from 'shared/helpers/hash';
import { useIsDesktop } from 'shared/helpers/isDesktop';
import { SOURCES_BY_TYPE } from 'constants/sources';
import { SourceType } from 'types/Sources.types';
import facades from 'public/ekb-facades.json';
import HealthProgress from 'features/HouseWearTear/HealthProgress/HealthProgress';
import styles from './CardContent.module.css';

export function HousesCardContent() {
    const { popupId } = usePopup();
    const { ekbMap } = useMap();
    const { loading } = useContext(MapContext);
    const isDesktop = useIsDesktop();

    const [placemark, setPlacemark] = useState<HouseObject | null>(null);

    useEffect(() => {
        const map = ekbMap?.getMap?.();

        if (!map || !popupId || loading) {
            return;
        }

        try {
            const [lat, lng] = getLatLngFromHash();

            const house = map.queryRenderedFeatures(map.project({ lat: +lat, lng: +lng }), {
                layers: ['building'],
            })?.[0]?.properties;

            if (!house) return;

            setPlacemark({
                id: popupId,
                attributes: {
                    osmId: house['osm:id'] || null,
                    Address: [house['addr:street'], house['addr:housenumber']]
                        .filter(Boolean)
                        .join(', '),
                    Management_company: house['building:management'],
                    Series: house['building:series'],
                    Condition: house['building:condition'],
                    Floors: house['building:levels'],
                    Year: house['building:year'],
                    Emergency: house['building:emergency'],
                    WearAndTear: house['building:health'],
                    borders: {
                        coordinates: [[+lat, +lng]],
                    },
                },
            });
        } catch (error) {
            console.error(error);
        }
    }, [ekbMap, popupId, loading]);

    useEffect(() => {
        const map = ekbMap?.getMap?.();

        if (!map || !popupId) {
            return;
        }

        // center map only on loading step
        if (loading) {
            try {
                const [lat, lng] = popupId.split('_');

                map.flyTo({ center: { lat: +lat, lng: +lng } });
            } catch (error) {
                console.error(error);
            }
        }
    }, [ekbMap, popupId, loading]);

    const isEmergency = useMemo(
        () => placemark?.attributes?.Condition === 'Аварийный',
        [placemark?.attributes?.Condition],
    );

    const aboutHouse = useMemo(() => {
        const result = [];
        if (placemark?.attributes?.Management_company) {
            result.push({
                name: 'Управляющая компания',
                text: placemark?.attributes?.Management_company,
            });
        }

        if (placemark?.attributes?.WearAndTear) {
            result.push({
                name: 'Износ',
                text: `${placemark?.attributes?.WearAndTear} %`,
                content: (
                    <HealthProgress
                        percent={placemark?.attributes?.WearAndTear}
                        isEmergency={isEmergency}
                    />
                ),
            });
        }

        if (placemark?.attributes?.Series) {
            result.push({
                name: 'Серия дома',
                text: placemark?.attributes?.Series,
            });
        }

        if (placemark?.attributes?.Floors) {
            result.push({
                name: 'Количество этажей',
                text: placemark?.attributes?.Floors,
            });
        }

        return result;
    }, [
        placemark?.attributes?.Management_company,
        placemark?.attributes?.WearAndTear,
        placemark?.attributes?.Series,
        placemark?.attributes?.Floors,
        isEmergency,
    ]);

    const defaultSources = [
        SOURCES_BY_TYPE[SourceType.osm],
        SOURCES_BY_TYPE[SourceType.howoldthishouse],
        SOURCES_BY_TYPE[SourceType.mingkh],
        SOURCES_BY_TYPE[SourceType.domaekb],
    ];

    if (loading) {
        return (
            <div className={styles.popup}>
                <FilterLoader />
            </div>
        );
    }

    if (!placemark?.attributes) {
        return null;
    }

    return (
        <div className={isDesktop ? styles.popup : styles.popup_mobile}>
            <Header
                coordinates={placemark?.attributes.borders?.coordinates?.[0]}
                title={placemark?.attributes.Address}
            />
            {(isEmergency || aboutHouse?.length > 0) && (
                <Section>
                    {isEmergency && (
                        <div className={styles.popup__emergencyLabel}>
                            <Label color="#e63223" backgroundColor="rgba(230, 50, 35, 0.24)">
                                {placemark?.attributes.Condition}
                            </Label>
                        </div>
                    )}
                    <Info nameColor="#9baac3" infos={aboutHouse} />
                </Section>
            )}
            {placemark?.attributes.Year && (
                <Section>
                    <ConstructionInfo date={String(placemark?.attributes.Year)} />
                </Section>
            )}

            {facades[placemark?.attributes?.osmId] && (
                <Section>
                    <Facade facade={facades[placemark?.attributes?.osmId]} />
                </Section>
            )}
            <Section>
                <Sources
                    sources={
                        facades[placemark?.attributes?.osmId]
                            ? defaultSources.concat(SOURCES_BY_TYPE[SourceType.ekaterinburgdesign])
                            : defaultSources
                    }
                />
            </Section>
            <Section>
                <EditObjectButtonLink address={placemark?.attributes.Address} />
            </Section>
        </div>
    );
}