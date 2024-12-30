import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { 
  MDBDataTableV5, 
  MDBDropdown, 
  MDBDropdownToggle, 
  MDBDropdownMenu, 
  MDBDropdownItem, 
  MDBModal, 
  MDBModalBody, 
  MDBModalHeader, 
  MDBModalFooter, 
  MDBBtn 
} from "mdbreact";
import StarRating from "./StarRating";

const Author = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [datatable, setDatatable] = useState({
    columns: [
      { label: "ID", field: "id" },
      { label: "Author Name", field: "authorName" },
      { label: "Email", field: "authorEmail" },
      { label: "Phone", field: "authorPhone" },
      { label: "Address", field: "authorAddress" },
      { label: "Books", field: "authorCreatedAt" },
      { label: "Actions", field: "actions", sort: "disabled", width: 100 },
    ],
    rows: [],
  });

  const [modal, setModal] = useState(false);
  const [selectedAuthor, setSelectedAuthor] = useState(null);

  const toggleModal = () => {
    setModal(!modal);
  };

  // Fetch authors data
  useEffect(() => {
    setIsLoading(false);
    axios
      .get("https://localhost:7248/api/Author")
      .then((response) => {
        
        const data = response.data.$values;
        const rows = data.map((row, index) => ({
          id: index + 1,
          authorName: row.name,
          authorEmail: row.email,
          authorPhone: row.mobileNumber,
          authorAddress: row.address,
          authorStatus: (
            <span
              className={`badge badge-${
                row.status === "active" ? "success" : "danger"
              }`}
            >
              {row.status}
            </span>
          ),
          authorCreatedAt: new Date(row.createAt
          ).toLocaleString(),
          actions: (
            <MDBDropdown>
              <MDBDropdownToggle caret style={{ backgroundColor: 'transparent', border: 'none', color: '#000' }} className="btn btn-sm btn-secondary">
                <i className="fas fa-ellipsis-v"></i>
              </MDBDropdownToggle>
              <MDBDropdownMenu basic>
                <MDBDropdownItem>
                  <i className="fas fa-edit"></i> Edit
                </MDBDropdownItem>
                <MDBDropdownItem>
                  <i className="fas fa-trash"></i> Delete
                </MDBDropdownItem>
                <MDBDropdownItem onClick={() => handleViewClick(row)}>
                  <i className="fas fa-eye"></i> View
                </MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          ),
        }));
        setDatatable((prevState) => {
          return { ...prevState, rows: rows };
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  }, []);

  // Handle view button click
  const handleViewClick = (author) => {
    setSelectedAuthor(author); // Set the selected author data
    toggleModal(); // Open modal
  };

  return (
    <>
      <div className="card shadow" style={{ marginBottom: "150px" }}>
        <div className="card-header py-3 d-sm-flex align-items-center justify-content-between">
          <Link to="/dashboard">
            <i className="fas fa-arrow-left"></i>{" "}
          </Link>
          <h6 className="m-0 font-weight-bold text-primary">All Authors</h6>
          <div>{""}</div>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            {isLoading ? (
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

      {/* Modal for viewing author details */}
      <MDBModal isOpen={modal} toggle={toggleModal}>
        <MDBModalHeader toggle={toggleModal}>Author Details</MDBModalHeader>
        <MDBModalBody>
          {selectedAuthor && (
            <>
              <p><strong>Author Ratings:</strong> {selectedAuthor.id ? <StarRating authorId={selectedAuthor.id} /> : "Not available"}</p>
              <p><strong>Name:</strong> {selectedAuthor.name}</p>
              <p><strong>Email:</strong> {selectedAuthor.email}</p>
              <p><strong>Phone:</strong> {selectedAuthor.mobileNumber}</p>
              <p><strong>Address:</strong> {selectedAuthor.address}</p>
              {/* <p><strong>Status:</strong> <span
              className={`badge badge-${
                selectedAuthor.status === "active" ? "success" : "danger"
              }`}
            >
              {selectedAuthor.status}
            </span></p> */}
              <p><strong>Created At:</strong> {new Date(selectedAuthor.createAt).toLocaleString()}</p>
            </>
          )}
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={toggleModal}>
            Close
          </MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </>
  );
};

export default Author;
