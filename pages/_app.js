import "../styles/global.css";
import "react-flexbox-grid/dist/react-flexbox-grid.css";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
