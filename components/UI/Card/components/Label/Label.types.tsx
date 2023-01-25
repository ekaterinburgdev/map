import { IconType } from 'components/UI/Icons/Icons.types';

export type LabelProps = {
    color: string;
    backgroundColor: string;
    icon?: IconType;
    onClick?: () => void;
};
