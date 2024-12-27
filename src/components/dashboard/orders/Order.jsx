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

const Order = () => {
  const [datatable, setDatatable] = useState({
    columns: [
      { label: "Order ID", field: "id" },
      {
        label: "Product Image",
        field: "product_image",
        width: 100,
      },
      {
        label: "Product Title",
        field: "product_title",
      },
      {
        label: "Product Price",
        field: "product_price",
      },
      {
        label: "Ordered Quantity",
        field: "order_quantity",
      },
      {
        label: "Total Amount",
        field: "total_amount",
      },
      {
        label: "Customer Name",
        field: "customer_name",
      },
      {
        label: "Status",
        field: "status",
      },
      {
        label: "Actions",
        field: "actions",
      }
    ],
    rows: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const toggleModal = () => setModal(!modal);

  const fetchData = () => {
    setIsLoading(true);
    axios.get("https://localhost:7248/api/Order") // Adjust this endpoint to your Order API if needed
      .then((response) => {
        const data = response.data.$values;
        console.log(data);
        if (!data || data.length === 0) {
          toast.info("No Orders found.");
          setIsLoading(false);
          return;
        }

        const rows = data.map((order) => ({
          id: `ORD-${new Date().getFullYear()}-${order.id}`,
          product_image: (
            <img
              src={order.product.image}
              alt={order.product.title}
              style={{ width: "25px", height: "25px", borderRadius: "50%" }}
            />
          ),
          product_title: order.product.title,
          product_price: `$${order.product.price}`,
          order_quantity: order.quantity,
          total_amount: order.totalPrice,
          customer_name: order.customer.name,
          status: order.status,
          actions: (
            <MDBDropdown>
              <MDBDropdownToggle caret style={{ backgroundColor: 'transparent', border: 'none', color: '#000' }} className="btn btn-sm btn-secondary">
                <i className="fas fa-ellipsis-v"></i>
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem onClick={() => {
                  setSelectedOrder(order);
                  toggleModal();
                }}>
                  <i className="fas fa-eye me-2"></i> View Details
                </MDBDropdownItem>
                <MDBDropdownItem onClick={() => {
                  setSelectedOrder(order);
                  toggleModal();
                }}>
                  <i className="fas fa-cart-shopping me-2"></i> Update Order Status
                </MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>
          ),
        }));

        setDatatable((prevState) => ({ ...prevState, rows: rows }));
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        toast.error(err.response?.data?.message || "Failed to load orders. Please try again later.");
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
              <p style={{ fontSize: '24px' }}>
                <strong>Order ID:</strong> {`ORD-${new Date().getFullYear()}-${selectedOrder.id}`},
              </p>
              <p><strong>Product Title:</strong> {selectedOrder.product.title}</p>
              <p><strong>Ordered Quantity:</strong> {selectedOrder.quantity}</p>
              <p><strong>Total Amount: $</strong> {selectedOrder.totalPrice}</p>
              <p><strong>Customer Name:</strong> {selectedOrder.customer.name}</p>
              <p><strong>Customer Address:</strong> {selectedOrder.customer.address}</p>
              <p><strong>Customer Mobile:</strong> {selectedOrder.customer.mobileNumber}</p>
              <p><strong>Status:</strong> <span className={`badge badge-${selectedOrder.status === "Pending" ? "danger" : "success"}`}>
                {selectedOrder.status}
              </span></p>
              <p><strong>Created At:</strong> {new Date(selectedOrder.createAt).toLocaleString()}</p>
            </div>
          )}
        </MDBModalBody>
        <MDBModalFooter>
          <MDBBtn color="secondary" onClick={toggleModal}>Close</MDBBtn>
        </MDBModalFooter>
      </MDBModal>
    </>
  );
};

export default Order;
