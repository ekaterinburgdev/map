import React from 'react';
import { ButtonLink } from 'components/UI/ButtonLink/ButtonLink';
import { IconType } from 'components/UI/Icons/Icons.types';

const getEditObjectLink = (address: string) =>
    `https://tally.so#tally-open=w2BoVe&tally-width=650&tally-overlay=1&tally-emoji-animation=none&address=${address}`;

type TEditObjectButtonLinkProps = {
    text?: string;
    address: string;
};

export function EditObjectButtonLink({
    text = 'Дополнить или поправить',
    address,
}: TEditObjectButtonLinkProps) {
    return <ButtonLink text={text} link={getEditObjectLink(address)} icon={IconType.Edit} />;
}
