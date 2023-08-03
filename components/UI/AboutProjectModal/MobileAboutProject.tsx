import Sheet from 'react-modal-sheet';
import * as React from 'react';
import { useContext } from 'react';
import { AboutProjectContent } from 'components/UI/AboutProjectModal/AboutProjectContent';
import { AboutProjectContext } from 'components/providers/AboutProjectProvider';
import styles from './AboutProjectModal.module.css';

export function MobileAboutProject() {
    const { isOpened, close } = useContext(AboutProjectContext);

    return (
        <Sheet isOpen={isOpened} onClose={close} snapPoints={[0.5]}>
            <Sheet.Container>
                <Sheet.Header />
                <Sheet.Content>
                    <Sheet.Scroller>
                        <div className={styles.aboutProjectModal__content_mobile}>
                            <AboutProjectContent />
                        </div>
                    </Sheet.Scroller>
                </Sheet.Content>
            </Sheet.Container>
        </Sheet>
    );
}
