import { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import Loader from "./components/utils/Loader";

const Login = lazy(() => import("./components/auth/login"));
const Register = lazy(() => import("./components/auth/register"));

const DashboardDetails = lazy(() => import("./components/dashboard/dashboardDetails"));
const Dashboard = lazy(() => import("./components/dashboard/dashboard"));

const Orders = lazy(() => import("./components/dashboard/orders/Order"));

const Authors = lazy(() => import("./components/dashboard/authors/Author"));
const AddAuthors = lazy(() => import("./components/dashboard/authors/AddAuthor"));

const Customer = lazy(() => import("./components/dashboard/customers/Customer"));
const AddCustomer = lazy(() => import("./components/dashboard/customers/AddCustomer"));

const Books = lazy(() => import("./components/dashboard/Books/Book"));
const AddBooks = lazy(() => import("./components/dashboard/Books/AddBook"));

const Analytics = lazy(() => import("./components/dashboard/reports/Analytics"));
const Reports = lazy(() => import("./components/dashboard/reports/Reports"));

const Settings = lazy(() => import("./components/dashboard/settings/Settings"));


const Categories = lazy(() => import("./components/dashboard/category/Category"));
const AddCategories = lazy(() => import("./components/dashboard/category/AddCategory"));

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
          <Route path="customers" element={<Customer />} />
          <Route path="customers/add" element={<AddCustomer />} />
          <Route path="customers/edit/:id" element={<AddCustomer />} />
          
          <Route path="authors" element={<Authors />} />
          <Route path="authors/add" element={<AddAuthors />} />

          <Route path="categories" element={<Categories />} />
          <Route path="categories/add" element={<AddCategories />} />

          <Route path="books" element={<Books />} />
          <Route path="books/add" element={<AddBooks />} />
          <Route path="books/edit/:id" element={<AddBooks />} />

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
