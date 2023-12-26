import { useCallback, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { setHash } from 'shared/helpers/hash';
import { activeFilterSelector } from 'state/features/selectors';
import { AboutProjectContext } from 'features/About/AboutProjectProvider';
import { MapItemType } from 'types/Content.types';

type PopupId = string;

export function usePopup() {
  const { close: closeAboutProject } = useContext(AboutProjectContext);

  const [popupId, setOpenedPopup] = useState<PopupId>(null);
  const [popupType, setPopupType] = useState<MapItemType>(null);

  const activeFilter: string = useSelector(activeFilterSelector);

  const openPopup = useCallback(
    (id: PopupId, type: MapItemType) => {
      closeAboutProject();
      setHash(type, id, activeFilter);
    },
    [activeFilter, closeAboutProject],
  );

  const closePopup = useCallback(() => {
    setPopupType(null);
    setOpenedPopup(null);

    window.location.hash = '';
  }, []);

  const handleOpenPopup = useCallback(() => {
    const [type, ...id] = window.location.hash.slice(1).split('/')[0].split('-');

    setOpenedPopup(id.join('-'));
    setPopupType(type as MapItemType);
  }, []);

  useEffect(() => {
    window.addEventListener('hashchange', handleOpenPopup, false);

    return () => {
      window.removeEventListener('hashchange', handleOpenPopup, false);
    };
  }, [handleOpenPopup]);

  useEffect(() => {
    if (!window.location.hash) {
      return;
    }

    handleOpenPopup();
  }, [handleOpenPopup]);

  return {
    popupId,
    popupType,
    openPopup,
    closePopup,
  };
}
