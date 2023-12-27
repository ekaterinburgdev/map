import { useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleData } from 'state/features/dataLayers';
import { activeFilterSelector } from 'state/features/selectors';
import { FilterType } from 'types/Filters.types';
import { useIsDesktop } from 'shared/helpers/isDesktop';
import { DesktopCard, MobileCard } from 'components/Card';
import { LeftSidebar } from 'components/LeftSidebar';
import { RightSidebar } from 'components/RightSidebar';
import { AboutProjectModal } from 'features/About/AboutProjectModal';
import { MobileAboutProject } from 'features/About/MobileAboutProject';
import { MapContext } from 'features/Map/providers/MapProvider';
import { Filters } from 'components/Filters';
import { MobileModal } from 'shared/UI/Modal/MobileModal';
import { CONTENTS_CONFIG } from './Content.config';
import { FILTERS_CONFIG } from './Filters.config';

export function Sidebars() {
    const isDesktop = useIsDesktop();
    const popupProps = useContext(MapContext);
    const dispatch = useDispatch();
    const activeFilter = useSelector(activeFilterSelector);
    const onToggleClick = useCallback(
        (type: FilterType) => {
            dispatch(toggleData({ type }));
        },
        [dispatch],
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
