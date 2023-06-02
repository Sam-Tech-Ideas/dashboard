import '@/styles/globals.css';
import Sidebar from '../components/Sidebar';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }) {
  return (
    <>
    <Toaster/>
      <Sidebar>
        <Component {...pageProps} />
      </Sidebar>
    </>
  );
}
