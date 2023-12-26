import React from 'react';
import dynamic from 'next/dynamic';

export const Page = dynamic(() => import('components/Privacy'), { ssr: false });

export default function Home() {
  return <Page />;
}
