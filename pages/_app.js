import '../styles/globals.css';
import 'antd/dist/antd.css';
import TopNav from '../components/TopNav';
import { ToastContainer } from  'react-toastify';

export default function myApp({ Component, pageProps }) {
  return (
    <>
      <ToastContainer />
      <TopNav />
      <Component {...pageProps} />
    </>
  )
}