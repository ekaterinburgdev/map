import * as React from 'react';

import Sheet from 'react-modal-sheet';
import { Filters } from 'components/UI/Filters/Filters';

export function MobileFilters() {
    const [isOpen, setOpen] = React.useState(true);
    const open = () => setOpen(true);
    const close = () => setOpen(false);

    return (
        <>
            <Sheet isOpen onClose={close} snapPoints={[0.5, 0.1]}>
                <Sheet.Container>
                    <Sheet.Header />
                    <Sheet.Content>
                        <Sheet.Scroller>
                            <Filters />
                        </Sheet.Scroller>
                    </Sheet.Content>
                </Sheet.Container>
            </Sheet>
        </>
    );
}
