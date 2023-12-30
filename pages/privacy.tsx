import React from 'react';
import dynamic from 'next/dynamic';

export const Page = dynamic(() => import('../features/Privacy/PrivacyPage'), { ssr: false });

export default function PrivacyPage() {
    return <Page />;
}
