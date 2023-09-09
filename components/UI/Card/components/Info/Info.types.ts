import { ReactNode } from 'react';

export interface InfoProps {
    infos: {
        name?: string;
        text?: string;
        content?: ReactNode;
    }[];
    nameColor?: string;
    textColor?: string;
    rowDirection?: boolean;
}
