import { MDBDataTableV5, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import Swal from "sweetalert2";
import {
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBBtn,
} from "mdbreact";

const Customer = () => {
  const [datatable, setDatatable] = useState({
    columns: [
      { label: "ID", field: "id" },
      { label: "Profile Image", field: "profileImage", width: 100 },
      { label: "Full Name", field: "fullName", width: 100 },
      { label: "Email", field: "email", width: 100 },
      { label: "Phone", field: "phone", width: 100 },
      { label: "Address", field: "address", width: 50 },
      { label: "Created At", field: "createdAt" },
      { label: "Actions", field: "actions", sort: "disabled", width: 200 },
    ],
    rows: [],
  });

  const [isloading, setIsloading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Function to handle showing modal and fetching customer details
  const handleShowModal = async (customerId) => {
    setIsloading(true);
    await axios
      .get(`https://localhost:7248/api/Customer/${customerId}`)
      .then((response) => {
        const customer = response.data;  // Extracting the customer from the response
        setSelectedCustomer(customer); // Set the fetched customer details
        setShowModal(true); // Show the modal
        setIsloading(false);
      })
      .catch((error) => {
        toast.error("Error fetching Customer details");
        setIsloading(false);
        console.log(error)
      });
  };


  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCustomer(null);
  };

  const deleteCustomer = (customerId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://localhost:7248/api/Customer/${customerId}`)
          .then((response) => {
            toast.success(response.data.message);
            // Fetch data again
            window.location.reload();
          })
          .catch((error) => {
            toast.error(error.response.data.message);
          });
      }
    });
  };

  useEffect(() => {
    setIsloading(true);
    axios
      .get("https://localhost:7248/api/Customer")
      .then((response) => {
        const data = response.data.$values;  // Extracting customer array from the response
        const rows = data.map((row) => {
          return {
            id: row.id,
            profileImage: (
              <img
                src={row.image}
                alt={row.name}
                style={{ width: "25px", height: "25px", borderRadius: "50%" }}
              />
            ),
            fullName: row.name,
            email: row.email,
            phone: row.mobileNumber,
            address: row.address,
            createdAt: new Date(row.createAt).toLocaleString(),
            actions: (
              <MDBDropdown>
                <MDBDropdownToggle caret style={{ backgroundColor: 'transparent', border: 'none', color: '#000' }} className="btn btn-sm btn-secondary">
                  <i className="fas fa-ellipsis-v"></i>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem>
                    <Link to={`/dashboard/customers/edit/${row.id}`} className="dropdown-item">
                      <i className="fas fa-edit"></i> Edit
                    </Link>
                  </MDBDropdownItem>
                  <MDBDropdownItem onClick={() => handleShowModal(row.id)}>
                    <i className="fas fa-eye"></i> View Details
                  </MDBDropdownItem>
                  <MDBDropdownItem onClick={() => deleteCustomer(row.id)}>
                    <i className="fas fa-trash"></i> Delete
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            ),
          };
        });
        setDatatable((prevState) => {
          return { ...prevState, rows: rows };
        });
        setIsloading(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, []);

  return (
    <>
      <div className="card shadow" style={{ marginBottom: "150px" }}>
        <div className="card-header py-3 d-sm-flex align-items-center justify-content-between">
          <Link to="/dashboard">
            <i className="fas fa-arrow-left"></i>{" "}
          </Link>
          <h6 className="m-0 font-weight-bold text-primary">All Customers</h6>
          <Link to="/dashboard/customers/add" className="btn btn-sm btn-primary">
            Add Customer
          </Link>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            {isloading ? (
              <div className="spinner-border text-primary" role="status"></div>
            ) : (
              <MDBDataTableV5
                hover
                entriesOptions={[5, 20, 25]}
                entries={5}
                pagesAmount={4}
                data={datatable}
                searchTop
                searchBottom={false}
              />
            )}
          </div>
        </div>
      </div>

      {/* MDB Modal */}
      <MDBModal isOpen={showModal} toggle={handleCloseModal} centered>
        <MDBModalHeader toggle={handleCloseModal}>
          Customer Details
        </MDBModalHeader>
        <MDBModalBody>
          {selectedCustomer ? (
            <>
              <h5>Customer Information</h5>
              <ul>
                <li><strong>ID:</strong> {selectedCustomer.id}</li>
                <li><strong>Full Name:</strong> {selectedCustomer.name}</li>
                <li><strong>Email:</strong> {selectedCustomer.email}</li>
                <li><strong>Phone:</strong> {selectedCustomer.mobileNumber}</li>
                <li><strong>Address:</strong> {selectedCustomer.address}</li>
                <li><strong>Reading Goals:</strong> {selectedCustomer.readingGoals}</li>
                <li><strong>Favorite Genres:</strong> {selectedCustomer.favoriteGenres.$values.join(", ")}</li>
                <li><strong>Created At:</strong> {new Date(selectedCustomer.createAt).toLocaleString()}</li>
              </ul>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={handleCloseModal}>
            Close
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </>
  );
};

export default Customer;
