import Sheet from 'react-modal-sheet';
import * as React from 'react';
import { useContext } from 'react';
import { AboutProjectContent } from 'features/About/AboutProjectContent';
import { AboutProjectContext } from 'features/About/AboutProjectProvider';

export function MobileAboutProject() {
    const { isOpened, close } = useContext(AboutProjectContext);

    return (
        <Sheet detent="full-height" isOpen={isOpened} onClose={close}>
            <Sheet.Container>
                <Sheet.Header />
                <Sheet.Content>
                    <Sheet.Scroller>
                        <AboutProjectContent />
                    </Sheet.Scroller>
                </Sheet.Content>
            </Sheet.Container>
        </Sheet>
    );
}
