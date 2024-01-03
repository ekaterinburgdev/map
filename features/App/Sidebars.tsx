import { useRouter } from 'next/router';
import { useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DesktopCard, MobileCard } from 'components/Card';
import { Filters } from 'components/Filters';
import { LeftSidebar } from 'components/LeftSidebar';
import { RightSidebar } from 'components/RightSidebar';
import { AboutProjectModal } from 'features/About/AboutProjectModal';
import { MobileAboutProject } from 'features/About/MobileAboutProject';
import { MapContext } from 'features/Map/providers/MapProvider';
import { MobileModal } from 'shared/UI/Modal/MobileModal';
import { useIsDesktop } from 'shared/helpers/isDesktop';
import { toggleData } from 'state/features/dataLayers';
import { activeFilterSelector } from 'state/features/selectors';
import { FilterType } from 'types/Filters.types';
import { CONTENTS_CONFIG } from './Content.config';
import { FILTERS_CONFIG } from './Filters.config';

export function Sidebars() {
    const isDesktop = useIsDesktop();
    const popupProps = useContext(MapContext);
    const dispatch = useDispatch();
    const router = useRouter();
    const activeFilter = useSelector(activeFilterSelector);
    const onToggleClick = useCallback(
        (type: FilterType) => {
            dispatch(toggleData({ type }));
            router.push({
                pathname: '/',
                query: { filter: type },
                hash: window.location.hash.slice(1),
            });
        },
        [dispatch, router],
    );

    const cardProps = {
        ...popupProps,
        contentConfig: CONTENTS_CONFIG,
    };

    const filter = (
        <Filters
            activeFilter={activeFilter as FilterType}
            onToggleClick={onToggleClick}
            filters={FILTERS_CONFIG}
        />
    );

    if (isDesktop) {
        return (
            <>
                <LeftSidebar>{filter}</LeftSidebar>
                <RightSidebar>
                    <DesktopCard {...cardProps} contentConfig={CONTENTS_CONFIG} />
                </RightSidebar>
                <AboutProjectModal />
            </>
        );
    }

    return (
        <>
            <MobileModal>{filter}</MobileModal>
            <MobileCard {...cardProps} contentConfig={CONTENTS_CONFIG} />
            <MobileAboutProject />
        </>
    );
}
