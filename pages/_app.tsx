import "../styles/global.css";
import "react-flexbox-grid/dist/react-flexbox-grid.css";
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
