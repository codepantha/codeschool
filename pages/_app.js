import '../styles/globals.css';
import 'antd/dist/antd.css';
import TopNav from '../components/TopNav';

export default function myApp({ Component, pageProps }) {
  return (
    <>
      <TopNav />
      <Component {...pageProps} />
    </>
  )
}