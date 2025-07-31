import React from 'react';
import type { AppProps } from 'next/app';
import { wrapper } from '../redux/store';
import { Provider } from 'react-redux';
import '../src/app/globals.css'; 
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);

  return (
    <Provider store={store}>
      <Component {...props.pageProps} />
    </Provider>
  );
}

export default App;
