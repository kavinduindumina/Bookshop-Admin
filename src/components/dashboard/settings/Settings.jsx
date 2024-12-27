import React, { useState, useEffect } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBAlert,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
} from "mdbreact";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Settings = () => {
  const [commission, setCommission] = useState("");
  const [vehicleRates, setVehicleRates] = useState([]);
  const [modal, setModal] = useState(false);
  const [currentVehicleRate, setCurrentVehicleRate] = useState(null); // Set the entire rate object

  // Fetch current settings on component mount
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/platform/get-vehicle-rate"
      );

      const commissionResponse = await axios.get(
        "http://localhost:3000/api/v1/platform/all-platform-rates"
      );

      setCommission(commissionResponse.data.message[0].rate);
      setVehicleRates(response.data.message);
    } catch (error) {
      toast.error("Failed to fetch settings");
    }
  };

  const handleUpdateCommission = () => {
    axios
      .put("http://localhost:3000/api/v1/settings/update-commission", {
        commission,
      })
      .then(() => {
        toast.success("Platform commission updated successfully");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleUpdateVehicleRates = () => {
    axios
      .put(
        "http://localhost:3000/api/v1/settings/update-vehicle-rates",
        vehicleRates
      )
      .then(() => {
        toast.success("Vehicle rates updated successfully");
        setModal(false); // Close modal after update
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const toggleModal = (vehicleRate) => {
    setCurrentVehicleRate(vehicleRate); // Set the entire vehicle rate object
    setModal(!modal);
  };

  const handleRateChange = (e) => {
    setCurrentVehicleRate({
      ...currentVehicleRate,
      rate: e.target.value,
    });
  };

  return (
    <div className="card shadow" >
      <div className="card-header py-3 d-sm-flex align-items-center justify-content-between">
        <Link to="/dashboard">
          <i className="fas fa-arrow-left"></i>{" "}
        </Link>
        <h6 className="m-0 font-weight-bold text-primary">Platform Settings</h6>
        <div>{""}</div>
      </div>
      <div
        className="card-body"
        
      >
        <MDBCard>
          <MDBCardHeader className="font-weight-bold">
            Platform Commission
          </MDBCardHeader>
          <MDBCardBody>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Commission"
                aria-label="Commission"
                aria-describedby="basic-addon1"
                value={commission}
                onChange={(e) => setCommission(e.target.value)}
              />
              <span className="input-group-text" id="basic-addon1">
                %
              </span>
            </div>
            <MDBAlert color="info">
              <strong>Note:</strong> This is the commission rate charged by the
              platform for each booking.
            </MDBAlert>
            <MDBBtn color="primary" onClick={handleUpdateCommission} block>
              Update Commission
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>

        <MDBCard className="mt-4">
          <MDBCardHeader className="font-weight-bold">Vehicle Rates</MDBCardHeader>
          <MDBCardBody>
            <div className="table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>Vehicle Type</th>
                    <th>Current Rate (Per km)</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {vehicleRates.map((vehicleRate, index) => (
                    <tr key={index}>
                      <td>{vehicleRate.vehicleType}</td>
                      <td>LKR {vehicleRate.rate}</td>
                      <td>
                        <MDBBtn
                          color="info"
                          onClick={() => toggleModal(vehicleRate)}
                        >
                          Update Rate
                        </MDBBtn>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </MDBCardBody>
        </MDBCard>

        {/* Update Vehicle Rate Modal */}
        {currentVehicleRate && (
          <MDBModal isOpen={modal} toggle={toggleModal}>
            <MDBModalHeader toggle={toggleModal}>
              Update {currentVehicleRate.vehicleType} Rate
            </MDBModalHeader>
            <MDBModalBody>
            <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
                LKR
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Rate"
                aria-label="Commission"
                aria-describedby="basic-addon1"
                value={currentVehicleRate.rate}
                onChange={handleRateChange}
              />
              
            </div>
            
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color="secondary" onClick={toggleModal}>
                Close
              </MDBBtn>
              <MDBBtn color="primary" onClick={handleUpdateVehicleRates}>
                Update Rate
              </MDBBtn>
            </MDBModalFooter>
          </MDBModal>
        )}
      </div>
    </div>
  );
};

export default Settings;
