import { ReactNode } from 'react';

export interface InfoProps {
    infos: {
        name?: string;
        text?: string | ReactNode;
        content?: ReactNode;
    }[];
    nameColor?: string;
    textColor?: string;
    rowDirection?: boolean;
}
