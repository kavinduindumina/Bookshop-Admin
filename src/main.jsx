import ReactDOM from "react-dom/client";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import "./assets/css/sb-admin-2.css";
import "./assets/css/footer.css";
import "./assets/vendor/fontawesome-free/css/all.min.css";

import "./assets/js/sb-admin-2.min.js";
import "./assets/vendor/bootstrap/js/bootstrap.bundle.min.js";
import "./assets/vendor/jquery-easing/jquery.easing.min.js";
import { ErrorProvider } from "./components/utils/ErrorContext.jsx";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter>
    <ErrorProvider>
      <App />

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition:Bounce
      />
    </ErrorProvider>
  </HashRouter>
);
