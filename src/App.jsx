import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Loader from "./components/utils/Loader";

const Login = lazy(() => import("./components/auth/login"));
const Register = lazy(() => import("./components/auth/register"));

const DashboardDetails = lazy(() => import("./components/dashboard/dashboardDetails"));
const Dashboard = lazy(() => import("./components/dashboard/dashboard"));

const Orders = lazy(() => import("./components/dashboard/orders/Order"));

const Drivers = lazy(() => import("./components/dashboard/authors/Author"));
const AddDrivers = lazy(() => import("./components/dashboard/authors/AddAuthor"));

const Passenger = lazy(() => import("./components/dashboard/customers/Customer"));
const AddPassenger = lazy(() => import("./components/dashboard/customers/AddCustomer"));

const PhoneOperators = lazy(() => import("./components/dashboard/Books/Book"));
const AddPhoneOperators = lazy(() => import("./components/dashboard/Books/AddBook"));

const Analytics = lazy(() => import("./components/dashboard/reports/Analytics"));
const Reports = lazy(() => import("./components/dashboard/reports/Reports"));

const Settings = lazy(() => import("./components/dashboard/settings/Settings"));


const Vehicles = lazy(() => import("./components/dashboard/category/Category"));
const AddVehicles = lazy(() => import("./components/dashboard/category/AddCategory"));

import PropTypes from "prop-types";

function ProtectedRoute({ children }) {
  ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
  };
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token, navigate]);

  if (!token) {
    return null;
  }

  return children;
}

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && location.pathname === "/") {
      navigate("/dashboard");
    }
  }, [navigate, location.pathname]);

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            //<ProtectedRoute>
              <Dashboard />
            //</ProtectedRoute>
          }
        >
          <Route index element={<DashboardDetails />} />
          <Route path="passengers" element={<Passenger />} />
          <Route path="passengers/add" element={<AddPassenger />} />
          <Route path="passengers/edit/:id" element={<AddPassenger />} />
          
          <Route path="drivers" element={<Drivers />} />
          <Route path="drivers/add" element={<AddDrivers />} />

          <Route path="vehicles" element={<Vehicles />} />
          <Route path="vehicles/add" element={<AddVehicles />} />

          <Route path="phoneOperators" element={<PhoneOperators />} />
          <Route path="phoneOperators/add" element={<AddPhoneOperators />} />
          <Route path="phoneOperators/edit/:id" element={<AddPhoneOperators />} />

          <Route path="orders" element={<Orders />} />

          <Route path="analytics" element={<Analytics />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="profile" element={<Settings />} />
        </Route>
        <Route path="*" element={<Login />} />
      </Routes>
    </Suspense>
  );
}

export default App;
