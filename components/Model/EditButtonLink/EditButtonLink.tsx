import React from 'react';
import { ButtonLink } from 'components/UI/ButtonLink/ButtonLink';
import { IconType } from 'components/UI/Icons/Icons.types';

const getEditObjectLink = (address: string) => `https://tally.so#tally-open=w2BoVe&tally-width=650&tally-overlay=1&tally-emoji-animation=none&address=${address}`;

type TEditButtonLinkProps = {
    address: string;
};

export function EditButtonLink({ address }: TEditButtonLinkProps) {
    return (
        <ButtonLink text="Дополнить или поправить" link={getEditObjectLink(address)} icon={IconType.Edit} />
    );
}
