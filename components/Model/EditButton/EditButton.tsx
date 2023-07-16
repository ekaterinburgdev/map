import React from 'react';
import { ButtonLink } from 'components/UI/ButtonLink/ButtonLink';

const EDIT_OBJECT_LINK = 'https://tally.so#tally-open=w2BoVe&tally-width=650&tally-overlay=1&tally-emoji-animation=none';

export function EditButton() {
    return (
        <ButtonLink text="Дополнить или поправить" link={EDIT_OBJECT_LINK} icon="edit" />
    );
}
