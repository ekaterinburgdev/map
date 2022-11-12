import React from 'react';

import 'styles/globals.css';

type AppProps<PropsType extends object> = {
    Component: React.ComponentType<PropsType>;
    pageProps: PropsType;
};

function App({ Component, pageProps }: AppProps<any>) {
    return <Component {...pageProps} />;
}

export default App;
