import axios from "axios";
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
  MDBBtn,
} from "mdbreact";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const Category = () => {
  const [datatable, setDatatable] = useState({
    columns: [
      { label: "ID", field: "id" },
      { label: "Category Name", field: "categoryName" },
      { label: "Description", field: "description" },
      { label: "Category Status", field: "categoryStatus" },
      { label: "Category Created At", field: "categoryCreatedAt" },
      { label: "Actions", field: "actions", sort: "disabled", width: 100 },
    ],
    rows: [],
  });

  const [isloading, setIsloading] = useState(false);
  const [modal, setModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    setIsloading(true);
    axios
      .get("http://localhost:3000/api/v1/category/all-categories")
      .then((response) => {
        const data = response.data.message;
        console.log(data);
        const rows = data.map((row, index) => ({
          id: index + 1,
          categoryName: row.categoryName,
          description: row.description,
          categoryStatus: (
            <span
              className={`badge badge-${
                row.status === "approved" ? "success" : "danger"
              }`}
            >
              {row.status}
            </span>
          ),
          categoryCreatedAt: new Date(row.createdAt).toLocaleString(),
          actions: (
            <MDBDropdown>
              <MDBDropdownToggle
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  color: "#000",
                }}
              >
                <i className="fas fa-ellipsis-v"></i>
              </MDBDropdownToggle>
              <MDBDropdownMenu basic>
                <MDBDropdownItem>
                  <i className="fas fa-edit"></i> Edit
                </MDBDropdownItem>
                <MDBDropdownItem onClick={() => handleViewClick(row.id)}>
                  <i className="fas fa-eye"></i> View
                </MDBDropdownItem>
                <MDBDropdownItem
                  onClick={() => handleDeleteClick(row.id)}
                  className="text-danger"
                >
                  <i className="fas fa-trash"></i> Delete
                </MDBDropdownItem>
                {row.status === "pending" ? (
                  <MDBDropdownItem
                    onClick={() => handleApproveClick(row.id)}
                    className="text-danger"
                  >
                    <i className="fas fa-check"></i> Approve
                  </MDBDropdownItem>
                ) : (
                  ""
                )}
              </MDBDropdownMenu>
            </MDBDropdown>
          ),
        }));
        setDatatable((prevState) => ({ ...prevState, rows }));
        setIsloading(false);
      })
      .catch((error) => {
        setIsloading(false);
        toast.error(error.response.data.message);
      });
  }, []);

  const handleViewClick = (rowId) => {
    axios
      .post(`http://localhost:3000/api/v1/category/get-category/${rowId}`)
      .then((response) => {
        setSelectedCategory(response.data.message);
        setModal(true); // Open modal
      })
      .catch((err) => {
        toast.error("Error fetching category details ", err.response.data.message);
      });
  };

  const handleApproveClick = (rowId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to approve this category?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(
            `http://localhost:3000/api/v1/category/update-category-status/${rowId}`
          )
          .then(() => {
            toast.success("Category approved successfully");
            window.location.reload();
          })
          .catch((err) => {
            toast.error(err.response.data.message);
          });
      }
    });
  };

  const handleDeleteClick = (rowId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this category?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .put(
            `http://localhost:3000/api/v1/category/delete-category/${rowId}`
          )
          .then(() => {
            toast.success("Category deleted successfully");
            window.location.reload();
          })
          .catch((err) => {
            toast.error(err.response.data.message);
          });
      }
    });
  };

  const toggleModal = () => setModal(!modal);

  return (
    <>
      <div className="card shadow" style={{ marginBottom: "150px" }}>
        <div className="card-header py-3 d-sm-flex align-items-center justify-content-between">
          <Link to="/dashboard">
            <i className="fas fa-arrow-left"></i>{" "}
          </Link>
          <h6 className="m-0 font-weight-bold text-primary">All Categories</h6>
          <Link to="/dashboard/categories/add" className="btn btn-sm btn-primary">
            Add Category
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

      {/* Category Details Modal */}
      {selectedCategory && (
        <MDBModal isOpen={modal} toggle={toggleModal}>
          <MDBModalHeader toggle={toggleModal}>Category Details</MDBModalHeader>
          <MDBModalBody>
            <p>
              <strong>Category Name:</strong> {selectedCategory.categoryName}
            </p>
            <p>
              <strong>Description:</strong> {selectedCategory.description}
            </p>
            <p>
              <strong>Status:</strong>
              <span
                className={`badge badge-${
                  selectedCategory.status === "approved" ? "success" : "danger"
                }`}
              >
                {selectedCategory.status}
              </span>
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(selectedCategory.createdAt).toLocaleString()}
            </p>
          </MDBModalBody>

          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={toggleModal}>
              Close
            </MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      )}
    </>
  );
};

export default Category;
