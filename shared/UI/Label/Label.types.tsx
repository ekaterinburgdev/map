import { IconType } from 'shared/UI/Icons/Icons.types';

export type LabelProps = {
    color: string;
    backgroundColor?: string;
    icon?: IconType;
    onClick?: () => void;
    right?: string;
    rightColor?: string;
};
