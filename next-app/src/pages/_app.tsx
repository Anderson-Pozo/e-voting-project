import type { AppProps } from 'next/app';
import '../styles/global.css';
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { withUrqlClient } from 'next-urql';
import { AuthProvider } from './auth/context/AuthProvider';


function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}

export default withUrqlClient(() => ({
  url: "http://localhost:4000/graphql"
}))(App);
