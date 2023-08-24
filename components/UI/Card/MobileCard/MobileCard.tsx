import Sheet from 'react-modal-sheet';
import * as React from 'react';
import { useContext } from 'react';
import { Card } from 'components/UI/Card/Card';
import { MapContext } from 'components/Map/providers/MapProvider';

export function MobileCard() {
    const { popupId, closePopup } = useContext(MapContext);

    return (
        <Sheet isOpen={Boolean(popupId)} onClose={closePopup} snapPoints={[0.5]}>
            <Sheet.Container>
                <Sheet.Header />
                <Sheet.Content>
                    <Sheet.Scroller>
                        <Card />
                    </Sheet.Scroller>
                </Sheet.Content>
            </Sheet.Container>
        </Sheet>
    );
}
