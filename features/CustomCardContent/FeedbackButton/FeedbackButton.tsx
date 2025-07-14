import { Button, ButtonSize, ButtonType, Icon, IconType } from 'sloy-ui';

const getEditObjectLink = () =>
    `mailto:mail@ekaterinburg.design`;

type Props = {
    address?: string;
};

export function FeedbackButton({ address }: Props) {
    if (!address) return null;

    const href = getEditObjectLink();

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
