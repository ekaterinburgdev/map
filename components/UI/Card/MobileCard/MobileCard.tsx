import Sheet from 'react-modal-sheet';
import * as React from 'react';
import { CardContent } from 'components/UI/Card/CardContent';
import { useContext } from 'react';
import { MapContext } from 'components/UI/Map/providers/MapProvider';

export function MobileCard() {
    const { popupId, closePopup } = useContext(MapContext);

    return (
        <Sheet isOpen={Boolean(popupId)} onClose={closePopup} snapPoints={[0.5]}>
            <Sheet.Container>
                <Sheet.Header />
                <Sheet.Content>
                    <Sheet.Scroller>
                        <CardContent />
                    </Sheet.Scroller>
                </Sheet.Content>
            </Sheet.Container>
        </Sheet>
    );
}
