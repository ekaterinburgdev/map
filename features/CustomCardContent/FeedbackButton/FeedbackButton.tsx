import { Button, ButtonSize, ButtonType, Icon, IconType } from 'sloy-ui';

const getEditObjectLink = (address: string) =>
    `https://tally.so#tally-open=w2BoVe&tally-width=650&tally-overlay=1&tally-emoji-animation=none&address=${address}`;

type Props = {
    address?: string;
};

export function FeedbackButton({ address }: Props) {
    if (!address) return null;

    const href = getEditObjectLink(address);

    return (
        <Button
            fullWidth
            type={ButtonType.DEFAULT}
            size={ButtonSize.MEDIUM}
            href={href}
            prefix={<Icon type={IconType.Edit} />}
        >
            Дополнить или поправить
        </Button>
    );
}
