import React, { useEffect, useMemo, useState } from 'react';
import { CardLoader } from 'components/Card/components/Loader/Loader';
import { ContentConfig, MapItemType } from 'types/Content.types';

interface Props {
  contentConfig: ContentConfig;
  popupId?: string;
  popupType: MapItemType | null;
}

export function Card({ contentConfig, popupId, popupType }: Props) {
  const [popupData, setPopupData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      if (!popupId || !popupType) {
        return;
      }

      setLoading(true);

      const requestFunction = contentConfig[popupType].oneItemRequest;

      const data = await requestFunction(popupId);

      setPopupData(data);
      setLoading(false);
    }

    fetchData();
  }, [contentConfig, popupId, popupType]);

  const CardContent = useMemo(() => {
    setLoading(true);

    return contentConfig[popupType]?.cardContent || (() => null);
  }, [contentConfig, popupType]);

  return loading ? <CardLoader /> : <CardContent placemark={popupData} />;
}
