import React, { ReactNode, useRef } from 'react';
import Sheet, { SheetRef } from 'react-modal-sheet';

export function MobileModal({ children }: { children: ReactNode }) {
    const ref = useRef<SheetRef>();

    return (
        <Sheet
            isOpen
            snapPoints={[0.5, 0.1]}
            ref={ref}
            // Prevent filter close
            onClose={() => ref.current.snapTo(1)}
        >
            <Sheet.Container>
                <Sheet.Header />
                <Sheet.Content>
                    <Sheet.Scroller>{children}</Sheet.Scroller>
                </Sheet.Content>
            </Sheet.Container>
        </Sheet>
    );
}
