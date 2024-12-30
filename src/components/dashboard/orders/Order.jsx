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
  MDBBtn,
} from "mdbreact";

const Order = () => {
  const [datatable, setDatatable] = useState({
    columns: [
      { label: "Order ID", field: "id" },
      {
        label: "Order at",
        field: "ordered_at",
      },
      {
        label: "Customer Name",
        field: "customer_name",
      },
      {
        label: "Total Amount",
        field: "total_amount",
      },
      {
        label: "Status",
        field: "status",
      },
      {
        label: "Actions",
        field: "actions",
      },
    ],
    rows: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const toggleModal = () => setModal(!modal);

  const fetchData = () => {
    setIsLoading(true);
    axios
      .get("https://localhost:7248/api/Order")
      .then((response) => {
        const data = response.data.$values;
        if (!data || data.length === 0) {
          toast.info("No Orders found.");
          setIsLoading(false);
          return;
        }

        let firstCustomerName = "";

        const rows = data.map((order, index) => {
          if (index === 0) {
            firstCustomerName = order.customer.name;
          }

          const formattedAmount = new Intl.NumberFormat("en-LK", {
            style: "currency",
            currency: "LKR",
            minimumFractionDigits: 2,
          }).format(order.totalPrice);

          return {
            id:  `ORD-${new Date().getFullYear()}-${order.id}`,
            ordered_at: new Date(order.createAt).toLocaleString(),
            customer_name: index === 0 ? firstCustomerName : firstCustomerName,
            total_amount: formattedAmount,
            status:
              order.status === "Pending" ? (
                <span className="badge badge-warning">{order.status}</span>
              ) : order.status === "Delivered" ? (
                <span className="badge badge-success">{order.status}</span>
              ) : (
                <span className="badge badge-danger">{order.status}</span>
              ),
            actions: (
              <MDBDropdown>
                <MDBDropdownToggle
                  caret
                  style={{
                    backgroundColor: "transparent",
                    border: "none",
                    color: "#000",
                  }}
                  className="btn btn-sm btn-secondary"
                >
                  <i className="fas fa-ellipsis-v"></i>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem
                    onClick={() => {
                      setSelectedOrder(order); // Make sure you are passing the entire order object
                      toggleModal();
                    }}
                  >
                    <i className="fas fa-eye me-2"></i> View Details
                  </MDBDropdownItem>
                  {order.status === "Cancelled" ||
                  order.status === "Delivered" ? (
                    ""
                  ) : (
                    <>
                      <MDBDropdownItem
                        onClick={() => {
                          setSelectedOrder(order);
                          toggleModal();
                        }}
                      >
                        <i className="fas fa-check me-2"></i> Approve Order
                      </MDBDropdownItem>
                      <MDBDropdownItem
                        onClick={() => {
                          setSelectedOrder(order);
                          toggleModal();
                        }}
                      >
                        <i className="fas fa-times me-2"></i> Decline Order
                      </MDBDropdownItem>
                    </>
                  )}
                </MDBDropdownMenu>
              </MDBDropdown>
            ),
          };
        });

        setDatatable((prevState) => ({ ...prevState, rows: rows }));
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        toast.error(
          err.response?.data?.message ||
            "Failed to load orders. Please try again later."
        );
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="card shadow" style={{ marginBottom: "250px" }}>
        <div className="card-header py-3 d-sm-flex align-items-center justify-content-between">
          <Link to="/dashboard">
            <i className="fas fa-arrow-left"></i>{" "}
          </Link>
          <h6 className="m-0 font-weight-bold text-primary">All Orders</h6>
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

      {/* Modal for Order Details */}
      <MDBModal isOpen={modal} toggle={toggleModal}>
        <MDBModalHeader toggle={toggleModal}>Order Details</MDBModalHeader>
        <MDBModalBody>
          {selectedOrder && (
            <div>
              <p style={{ fontSize: "24px" }}>
                <strong>Order ID:</strong>{" "}
                {`ORD-${new Date().getFullYear()}-${selectedOrder.id}`}
              </p>
              {/* Displaying the order details */}
              <p>
                <strong>Customer Name:</strong> {selectedOrder.customer.name}
              </p>
              <p>
                <strong>Customer Address:</strong>{" "}
                {selectedOrder.customer.address}
              </p>
              <p>
                <strong>Customer Mobile:</strong>{" "}
                {selectedOrder.customer.mobileNumber}
              </p>
              <p>
                <strong>Ordered Items:</strong>
              </p>
              <ul>
                {selectedOrder.orderItems.$values?.map((item, index) => (
                  <li key={index}>
                    <strong>Product:</strong> {item.book.title} -{" "}
                    <strong>Quantity:</strong> {item.quantity
                    }
                  </li>
                ))}
              </ul>
              <p>
                <strong>Total Amount:</strong>{" "}
                {new Intl.NumberFormat("en-LK", {
                  style: "currency",
                  currency: "LKR",
                }).format(selectedOrder.totalPrice)}
              </p>
              <p>
                <strong>Status:</strong>
                {
                  selectedOrder.status === "Pending" ? (
                    <span className="badge badge-warning">{selectedOrder.status}</span>
                  ) : selectedOrder.status === "Delivered" ? (
                    <span className="badge badge-success">{selectedOrder.status}</span>
                  ) : (
                    <span className="badge badge-danger">{selectedOrder.status}</span>
                  )
                }
              </p>
              <p>
                <strong>Created At:</strong>{" "}
                {new Date(selectedOrder.createAt).toLocaleString()}
              </p>
            </div>
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

export default Order;
