import React, { useRef } from 'react';
import Sheet, { SheetRef } from 'react-modal-sheet';

import { Filters } from 'components/Filters/Filters';

export function MobileFilters() {
  const ref = useRef<SheetRef>();

  return (
    <>
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
            <Sheet.Scroller>
              <Filters />
            </Sheet.Scroller>
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
    </>
  );
}
