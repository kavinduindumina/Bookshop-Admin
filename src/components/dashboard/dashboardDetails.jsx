import { useOutletContext } from "react-router-dom";
import { defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Doughnut } from "react-chartjs-2";
import { useState } from "react";

defaults.responsive = true;

const DashboardDetails = () => {
  const { driversCount } = useOutletContext();
  const { customersCount } = useOutletContext();
  const { vehiclesCount } = useOutletContext();
  const { bookingsCount } = useOutletContext();
  const { income } = useOutletContext();
  const [totalIncome, settotalIncome] = useState("78500");
  const [cost, setCost] = useState("");
  const [netProfit, setNetProfit] = useState("53900");
  const [isloading, setIsloading] = useState(false);

  return (
    <div  style={{ marginBottom:"50px" }}>
      
      {/* <!-- Page Heading --> */}
      <div className="d-sm-flex align-items-center justify-content-between mb-3">
        <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
      </div>
      {/* <!-- Content Row --> */}
      <div className="row">
        {/* <!-- Earnings (Monthly) Card Example --> */}
        <div className="col-xl-4 col-md-6 mb-4">
          <div className="card border-left-danger shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-danger text-uppercase mb-1">
                    Pending Orders
                  </div>
                  <div className="h3 mb-0 font-weight-bold text-gray-800">
                    {isloading ? (
                      <div
                        className="spinner-border text-danger"
                        role="status"
                      >
                        {" "}
                      </div>
                    ) : customersCount == 0 ? (
                      0
                    ) : (
                      customersCount
                    )}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-road-circle-exclamation fa-2x text-danger"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Earnings (Monthly) Card Example --> */}
        <div className="col-xl-4 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    On Going Orders
                  </div>
                  <div className="h3 mb-0 font-weight-bold text-gray-800">
                    {isloading ? (
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        {" "}
                      </div>
                    ) : driversCount == 0 ? (
                      0
                    ) : (
                      driversCount
                    )}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-road-circle-check fa-2x text-success fa-2x "></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Earnings (Monthly) Card Example --> */}
        <div className="col-xl-4 col-md-6 mb-4">
          <div className="card border-left-info shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                    Completed Orders
                  </div>
                  <div className="row no-gutters align-items-center">
                    <div className="col-auto">
                      <div className="h3 mb-0 mr-3 font-weight-bold text-gray-800">
                      {isloading ? (
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        {" "}
                      </div>
                    ) : vehiclesCount == 0 ? (
                      0
                    ) : (
                      vehiclesCount
                    )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-road-lock fa-2x text-info"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      <div className="row">
        <div className="col-xl-6 col-md-6 mb-4">
          <div className="card border-left-dark shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-dark text-uppercase mb-1">
                    {parseInt(netProfit.replace(/[^-0-9.]/g, "")) < 0
                      ? "Total Lost"
                      : "Net Profit"}
                  </div>
                  {isloading ? (
                    <div className="spinner-border text-dark" role="status">
                      {" "}
                    </div>
                  ) : parseInt(netProfit.replace(/[^-0-9.]/g, "")) < 0 ? (
                    <div className="h3 mb-0 font-weight-bold text-danger">
                      {netProfit}
                    </div>
                  ) : (
                    <div className="h3 mb-0 font-weight-bold text-success">
                      {netProfit}
                    </div>
                  )}
                </div>
                <div className="col-auto">
                  <i className="fas fa-money-bill fa-2x text-dark"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Earnings (Monthly) Card Example --> */}
        <div className="col-xl-6 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    Total Income
                  </div>
                  <div className="h3 mb-0 font-weight-bold text-gray-800">
                    {isloading ? (
                      <div
                        className="spinner-border text-success"
                        role="status"
                      >
                        {" "}
                      </div>
                    ) : totalIncome == 0 ? (
                      0
                    ) : (
                      totalIncome
                    )}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-money-bill fa-2x text-success"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      <div className="row">
        {/* <!-- Earnings (Monthly) Card Example --> */}
        <div className="col-xl-4 col-md-6 mb-4">
          <div className="card border-left-primary shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                    No of Customers
                  </div>
                  <div className="h3 mb-0 font-weight-bold text-gray-800">
                    {isloading ? (
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        {" "}
                      </div>
                    ) : customersCount == 0 ? (
                      0
                    ) : (
                      customersCount
                    )}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-user fa-2x text-primary"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Earnings (Monthly) Card Example --> */}
        <div className="col-xl-4 col-md-6 mb-4">
          <div className="card border-left-success shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-success text-uppercase mb-1">
                    No of Categories
                  </div>
                  <div className="h3 mb-0 font-weight-bold text-gray-800">
                    {isloading ? (
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        {" "}
                      </div>
                    ) : driversCount == 0 ? (
                      0
                    ) : (
                      driversCount
                    )}
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-book fa-2x text-success"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- Earnings (Monthly) Card Example --> */}
        <div className="col-xl-4 col-md-6 mb-4">
          <div className="card border-left-info shadow h-100 py-2">
            <div className="card-body">
              <div className="row no-gutters align-items-center">
                <div className="col mr-2">
                  <div className="text-xs font-weight-bold text-info text-uppercase mb-1">
                    No of Books 
                  </div>
                  <div className="row no-gutters align-items-center">
                    <div className="col-auto">
                      <div className="h3 mb-0 mr-3 font-weight-bold text-gray-800">
                      {isloading ? (
                      <div
                        className="spinner-border text-primary"
                        role="status"
                      >
                        {" "}
                      </div>
                    ) : vehiclesCount == 0 ? (
                      0
                    ) : (
                      vehiclesCount
                    )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-auto">
                  <i className="fas fa-book fa-2x text-info"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      
    </div>
  );
};

export default DashboardDetails;
