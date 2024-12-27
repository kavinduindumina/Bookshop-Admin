import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import DateTime from "./DateAndTime";

const Dashboard = () => {  
  const navigate = useNavigate();
  const [driversCount, setDriverCount] = useState(0);
  const [customersCount, setCustomerCount] = useState(0);
  const [bookingsCount, setBookingsCount] = useState(0);
  const [vehiclesCount, setVehiclesCount] = useState(0);

  const Logout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout from system",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "No, cancel",
      confirmButtonText: "Yes, Logout",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        
        localStorage.clear();
        navigate("/");
      }
    });
  };

  return (
    <div id="page-top">
      <div id="wrapper">
        {/* <!-- Sidebar --> */}
        <ul
          className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
          id="accordionSidebar"
        >
          {/* <!-- Sidebar - Brand --> */}
          <a
            className="sidebar-brand d-flex align-items-center justify-content-center"
            href="#"
          >
            <div className="sidebar-brand-text mx-3">
              Book Shop Admin
            </div>
          </a>

          {/* <!-- Divider --> */}
          <hr className="sidebar-divider my-0" />

          {/* <!-- Nav Item - Dashboard --> */}
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">
              <i className="fas fa-fw fa-tachometer-alt"></i>
              <span className=" fw-bold">Dashboard</span>
            </Link>
          </li>

          {/* <!-- Divider --> */}
          <hr className="sidebar-divider" />

          {/* <!-- Heading --> */}
          <div className="sidebar-heading">Interface</div>

          {/* <!-- Nav Item - Pages Collapse Menu --> */}
          <li className="nav-item">
            <a
              className="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#Orders"
              aria-expanded="true"
              aria-controls="Orders"
            >
              <i className="fas fa-fw fa-check"></i>
              <span className=" fw-bold">Order Management</span>
            </a>
            <div
              id="Orders"
              className="collapse"
              aria-labelledby="headingTwo"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Components</h6>
                <Link className="collapse-item" to="/dashboard/orders">
                  All Orders
                </Link>
              </div>
            </div>
          </li>

          <li className="nav-item">
            <a
              className="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#collapseTwo"
              aria-expanded="true"
              aria-controls="collapseTwo"
            >
              <i className="fas fa-fw fa-user"></i>
              <span className=" fw-bold">Customer Management</span>
            </a>
            <div
              id="collapseTwo"
              className="collapse"
              aria-labelledby="headingTwo"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Components</h6>
                <Link className="collapse-item" to="/dashboard/customers">
                  All Customers
                </Link>
                <Link className="collapse-item" to="/dashboard/passengers/add">
                  Add Customer
                </Link>
              </div>
            </div>
          </li>
        
          <li className="nav-item">
            <a
              className="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#Category"
              aria-expanded="true"
              aria-controls="Category"
            >
              <i className="fas fa-fw fa-user"></i>
              <span className=" fw-bold">Author Management</span>
            </a>
            <div
              id="Category"
              className="collapse"
              aria-labelledby="Category"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Components</h6>
                <Link className="collapse-item" to="/dashboard/drivers">
                  All Authors
                </Link>
                <Link className="collapse-item" to="/dashboard/drivers/add">
                  Add Author
                </Link>
              </div>
            </div>
          </li>

          <li className="nav-item">
            <a
              className="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#Brands"
              aria-expanded="true"
              aria-controls="Brands"
            >
              <i className="fas fa-fw fa-list"></i>
              <span className=" fw-bold">Category Management</span>
            </a>
            <div
              id="Brands"
              className="collapse"
              aria-labelledby="Brands"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Components</h6>
                <Link className="collapse-item" to="/dashboard/vehicles">
                  All Categories
                </Link>
                <Link className="collapse-item" to="/dashboard/vehicles/add">
                  Add Category
                </Link>
              </div>
            </div>
          </li>

          <li className="nav-item">
            <a
              className="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#Products"
              aria-expanded="true"
              aria-controls="Products"
            >
              <i className="fas fa-fw fa-book"></i>
              <span className=" fw-bold">Book Management</span>
            </a>
            <div
              id="Products"
              className="collapse"
              aria-labelledby="Products"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Components</h6>
                <Link className="collapse-item" to="/dashboard/phoneOperators">
                  All Books
                </Link>
                <Link className="collapse-item" to="/dashboard/phoneOperators/add">
                  Add Book
                </Link>
              </div>
            </div>
          </li>

          <li className="nav-item">
            <a
              className="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#Reports"
              aria-expanded="true"
              aria-controls="Reports"
            >
              <i className="fas fa-fw fa-chart-bar"></i>
              <span className=" fw-bold">Reports & Analytics </span>
            </a>
            <div
              id="Reports"
              className="collapse"
              aria-labelledby="Reports"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Components</h6>
                <Link className="collapse-item" to="/dashboard/analytics">
                  Analytics
                </Link>
                <Link className="collapse-item" to="/dashboard/reports">
                  Reports
                </Link>
              </div>
            </div>
          </li>

          <li className="nav-item">
            <a
              className="nav-link collapsed"
              href="#"
              data-toggle="collapse"
              data-target="#Settings"
              aria-expanded="true"
              aria-controls="Settings"
            >
              <i className="fas fa-fw fa-gear"></i>
              <span className=" fw-bold">Settings</span>
            </a>
            <div
              id="Settings"
              className="collapse"
              aria-labelledby="Settings"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Components</h6>
                <Link className="collapse-item" to="/dashboard/settings">
                  Settings
                </Link>
              </div>
            </div>
          </li>
        </ul>
        {/* <!-- End of Sidebar --> */}

        {/* <!-- Content Wrapper --> */}
        <div id="content-wrapper" className="d-flex flex-column">
          {/* <!-- Main Content --> */}
          <div id="content">
            {/* <!-- Topbar --> */}
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
              <DateTime />
              {/* <!-- Sidebar Toggle (Topbar) --> */}
              <button
                id="sidebarToggleTop"
                className="btn btn-link d-md-none rounded-circle mr-3"
              >
                <i className="fa fa-bars"></i>
              </button>

              {/* <!-- Topbar Navbar --> */}
              <ul className="navbar-nav ml-auto">
                {/* <!-- Nav Item - Alerts --> */}
                {/* <ActionCenter /> */}

                <div className="topbar-divider d-none d-sm-block"></div>

                {/* <!-- Nav Item - User Information --> */}
                <li className="nav-item dropdown no-arrow">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="userDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className="mr-2 d-none d-lg-inline text-gray-600 small fw-bold">
                      Kavindu
                    </span>
                    <img className="img-profile rounded-circle" src="" />
                  </a>
                  {/* <!-- Dropdown - User Information --> */}
                  <div
                    className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                    aria-labelledby="userDropdown"
                  >
                    <Link className="dropdown-item" to="/dashboard/profile">
                      <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                      Profile
                    </Link>
                    <button className="dropdown-item" onClick={() => Logout()}>
                      <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                      Logout
                    </button>
                  </div>
                </li>
              </ul>
            </nav>
            {/* <!-- End of Topbar --> */}
          </div>
          <div className="container-fluid">
            <Outlet
              context={{
                driversCount,
                customersCount,
                vehiclesCount,
                bookingsCount,
              }}
            />
          </div>
          {/* <!-- End of Main Content -->

        <!-- Footer --> */}
          <footer className="sticky-footer bg-white">
            <div className="container my-auto">
              <div className="copyright text-center my-auto">
                <span>Copyright &copy; Book Shop | 2024 </span>
              </div>
            </div>
          </footer>
          {/* <!-- End of Footer --> */}
        </div>
        {/* <!-- End of Content Wrapper --> */}
      </div>
      {/* <!-- End of Page Wrapper -->

<!-- Scroll to Top Button--> */}
      <a className="scroll-to-top rounded" href="#page-top">
        <i className="fas fa-angle-up"></i>
      </a>
    </div>
  );
};

export default Dashboard;
