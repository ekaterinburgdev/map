import { useContext } from 'react';
import { useIsDesktop } from 'shared/helpers/isDesktop';
import { DesktopCard, MobileCard } from 'components/Card';
import { LeftSidebar } from 'components/LeftSidebar/LeftSidebar';
import { RightSidebar } from 'components/RightSidebar/RightSidebar';
import { AboutProjectModal } from 'features/About/AboutProjectModal';
import { MobileAboutProject } from 'features/About/MobileAboutProject';
import { MapContext } from 'features/Map/providers/MapProvider';
import { Filters, MobileFilters } from 'features/Filters';
import { CONTENTS_CONFIG } from './Content.config';
import { FILTERS_CONFIG } from './Filters.config';

export function Sidebars() {
  const isDesktop = useIsDesktop();
  const popupProps = useContext(MapContext);

  const cardProps = {
    ...popupProps,
    contentConfig: CONTENTS_CONFIG,
  };

  if (isDesktop) {
    return (
      <>
        <LeftSidebar>
          <Filters filters={FILTERS_CONFIG} />
        </LeftSidebar>
        <RightSidebar>
          <DesktopCard {...cardProps} contentConfig={CONTENTS_CONFIG} />
        </RightSidebar>
        <AboutProjectModal />
      </>
    );
  }

  return (
    <>
      <MobileFilters filters={FILTERS_CONFIG} />
      <MobileCard {...cardProps} contentConfig={CONTENTS_CONFIG} />
      <MobileAboutProject />
    </>
  );
}
