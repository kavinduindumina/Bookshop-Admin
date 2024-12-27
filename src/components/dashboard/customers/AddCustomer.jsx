import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ImageUploader from "../../utils/ImageUploader";

const AddCustomer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [fullname, setFullName] = useState("");
  const [phone, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [readingGoals, setReadingGoals] = useState("");
  const [favoriteGenres, setFavoriteGenres] = useState([]);
  const [password, setPassword] = useState("");  // Added password state
  const [confirmPassword, setConfirmPassword] = useState("");  // Added confirm password state
  const [passwordError, setPasswordError] = useState("");  // Error state for password validation
  const [isloading, setIsloading] = useState(false);
  const [imageUrls, setImageUrl] = useState("");

  const handleImageUrlChange = (newImageUrl) => {
    setImageUrl(newImageUrl);
  };

  useEffect(() => {
    if (id) {
      // Fetch existing customer data for edit
      axios
        .get(`https://localhost:7248/api/Customer/${id}`)
        .then((response) => {
          const data = response.data.$values[0];
          setEmail(data.email);
          setFullName(data.name);
          setPhoneNumber(data.mobileNumber);
          setAddress(data.address);
          setReadingGoals(data.readingGoals);
          setFavoriteGenres(data.favoriteGenres || []);
          setImageUrl(data.image || "");
          setIsloading(false);
        })
        .catch((error) => {
          setIsloading(false);
          toast.error("Error fetching customer: " + error);
        });
    }
  }, [id]);

  const validatePassword = () => {
    const passwordRegEx = /[A-Z]/; // Password must contain at least one uppercase letter
    if (!passwordRegEx.test(password)) {
      setPasswordError("Password must contain at least one uppercase letter.");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsloading(true);

    // Validate password before submitting
    if (!validatePassword()) {
      setIsloading(false);
      return;
    }

    if (password !== confirmPassword) {
      setIsloading(false);
      toast.error("Passwords do not match");
      return;
    }

    const newCustomerData = {
      email,
      password,  // Include password in the registration data
      name: fullname,
      mobileNumber: phone,
      address,
      readingGoals,
      favoriteGenres,
    };

    try {
      const response = await axios.post(
        "https://localhost:7248/api/Auth/customer-register",
        newCustomerData
      );

      if (response.status === 200) {
        setIsloading(false);
        toast.success("Customer added successfully");
        // Reset the form
        setEmail("");
        setFullName("");
        setPhoneNumber("");
        setAddress("");
        setReadingGoals("");
        setFavoriteGenres([]);
        setPassword("");  // Reset password
        setConfirmPassword("");  // Reset confirm password
        setImageUrl("");
        // Optionally, redirect after successful submission
        navigate("/dashboard/customers");
      }
    } catch (error) {
      setIsloading(false);
      if (error.response?.data) {
        const errorMessage = error.response.data.$values[0]?.errorMessage;
        toast.error(errorMessage || "Error adding customer.");
      } else {
        toast.error("Error adding customer: " + error.message);
      }
    }
  };

  const onEdit = async (e) => {
    e.preventDefault();
    setIsloading(true);

    const updatedCustomerData = {
      email,
      name: fullname,
      mobileNumber: phone,
      address,
      readingGoals,
      favoriteGenres,
    };

    try {
      const response = await axios.put(
        `https://localhost:7248/api/Customer/${id}`,
        updatedCustomerData
      );

      if (response.status === 200) {
        setIsloading(false);
        toast.success("Customer updated successfully");
        // Optionally, redirect after successful update
        navigate("/dashboard/customers");
      }
    } catch (error) {
      setIsloading(false);
      toast.error("Error updating customer: " + error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="card shadow" style={{ marginBottom: "250px" }}>
      <div className="card-header py-3 d-sm-flex align-items-center justify-content-between">
        <Link to="/dashboard/customers">
          <i className="fas fa-arrow-left"></i>{" "}
        </Link>
        <h6 className="m-0 font-weight-bold text-primary">
          {id ? "Update Customer" : "Add new Customer"}
        </h6>
        <div>{""}</div>
      </div>
      <div className="card-body">
        <div>
          <div className="row mb-4">
            <div className="col">
              <label className="form-label">Profile Picture</label>
              <ImageUploader onImageUrlChange={handleImageUrlChange} />
            </div>
          </div>
          <form>
            <div className="row mb-4">
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <label className="form-label" htmlFor="form6Example6">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="form6Example6"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <label className="form-label" htmlFor="form6Example7">
                    Name
                  </label>
                  <input
                    type="text"
                    id="form6Example7"
                    className="form-control"
                    value={fullname}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <label className="form-label" htmlFor="form6Example7">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    id="form6Example7"
                    className="form-control"
                    value={phone}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <label className="form-label" htmlFor="form6Example7">
                    Address
                  </label>
                  <input
                    type="text"
                    id="form6Example7"
                    className="form-control"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <label className="form-label" htmlFor="form6Example7">
                    Reading Goals
                  </label>
                  <input
                    type="text"
                    id="form6Example7"
                    className="form-control"
                    value={readingGoals}
                    onChange={(e) => setReadingGoals(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <label className="form-label" htmlFor="form6Example7">
                    Favorite Genres
                  </label>
                  <input
                    type="text"
                    id="form6Example7"
                    className="form-control"
                    value={favoriteGenres.join(", ")}
                    onChange={(e) =>
                      setFavoriteGenres(e.target.value.split(",").map((genre) => genre.trim()))
                    }
                    required
                  />
                </div>
              </div>
            </div>

            {/* Password Fields */}
            <div className="row mb-4">
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  {passwordError && <small className="text-danger">{passwordError}</small>}
                </div>
              </div>
            </div>

            <div className="row mb-4">
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <label className="form-label" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <button
              data-mdb-ripple-init
              type="button"
              className={isloading ? "btn btn-primary btn-block disabled" : "btn btn-primary btn-block"}
              onClick={id ? onEdit : onSubmit}
            >
              {isloading ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Save Customer"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCustomer;
