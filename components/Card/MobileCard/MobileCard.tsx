import Sheet from 'react-modal-sheet';
import * as React from 'react';
import { Card } from 'components/Card/Card';
import { ContentConfig, MapItemType } from 'types/Content.types';

interface Props {
    contentConfig: ContentConfig;
    popupId?: string;
    popupType: MapItemType | null;
    closePopup: () => void;
}

export function MobileCard({ contentConfig, popupId, popupType, closePopup }: Props) {
    return (
        <Sheet isOpen={Boolean(popupId)} onClose={closePopup} snapPoints={[0.5]}>
            <Sheet.Container>
                <Sheet.Header />
                <Sheet.Content>
                    <Sheet.Scroller>
                        <Card
                            popupId={popupId}
                            popupType={popupType}
                            contentConfig={contentConfig}
                        />
                    </Sheet.Scroller>
                </Sheet.Content>
            </Sheet.Container>
        </Sheet>
    );
}
