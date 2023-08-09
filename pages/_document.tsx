import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    const siteTitle = 'Инфокарта Екатеринбурга';
    const siteUrl = 'https://map.ekaterinburg.city/';
    const siteDescription = 'Вся информация о городе теперь собрана в одном месте: возраст домов, объекты культурного наследия, дтп — всё на свете.';
    const ogImage = `${siteUrl}og-preview.jpg`;

    return (
        <Html lang="ru" style={{ background: 'black' }}>
            <Head>
                <meta name="theme-color" content="#000000" />
                <meta name="description" content={siteDescription} />

                <meta property="og:type" content="website" />
                <meta property="og:url" content={siteUrl} />
                <meta property="og:title" content={siteTitle} />
                <meta property="og:description" content={siteDescription} />
                <meta property="og:image" content={ogImage} />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content={siteUrl} />
                <meta property="twitter:title" content={siteTitle} />
                <meta property="twitter:description" content={siteDescription} />
                <meta property="twitter:image" content={ogImage} />

                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/site.webmanifest" />

                <link rel="dns-prefetch" href="https://tiles.ekaterinburg.io/" />
                <link rel="dns-prefetch" href="https://map-api.ekaterinburg.io/" />
            </Head>

            <body>
                <script async src="https://tally.so/widgets/embed.js" />
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
