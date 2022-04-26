import '../styles/globals.css';
import 'antd/dist/antd.css';
import { Provider } from '../context';
import TopNav from '../components/TopNav';
import { ToastContainer } from  'react-toastify';

export default function myApp({ Component, pageProps }) {
  return (
    <Provider>
      <ToastContainer />
      <TopNav />
      <Component {...pageProps} />
    </Provider>
  )
}