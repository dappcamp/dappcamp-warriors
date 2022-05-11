import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);

  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {getLayout(<Component {...pageProps} />)}
    </>
  );
}

export default MyApp;
