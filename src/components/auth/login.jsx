import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);

  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address 😒");
      return;
    }
    setIsloading(true);
    axios
      .post("https://localhost:7248/api/Auth/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        setIsloading(true);
        localStorage.setItem("token", res.data.token);
        console.log(res.data.token);
        navigate("/dashboard");
        setIsloading(false);

      })
      .catch((err) => {
        setIsloading(false);
        setShowOTP(false);
        toast.error(err.response.data + " ☹️");
        console.log(err);
      });
  };

  return (
    <div className="bg-primary bg-gradient">
      <div className="container" style={{ height: "100vh" }}>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card o-hidden border-0 shadow-lg my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div>
                    <div className="p-5">
                      <div className="text-center">
                        <img
                          src="logo.png"
                          alt=""
                          width={150}
                          style={{ marginBottom: "20px" }}
                        />
                        <h1 className="h3 text-gray-900 fw-bold">
                          Welcome to the Admin Portal
                        </h1>
                        <p className="fs-6 mb-4 text-secondary">
                          Please Login to your account
                        </p>
                      </div>
                
                      <form className="user" autoComplete="none">
                        <div className="form-group">
                          <input
                            type="email"
                            className="form-control form-control-user fs-6"
                            id="exampleInputEmail"
                            aria-describedby="emailHelp"
                            placeholder="Enter your username"
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="none"
                            disabled={isloading}
                          />
                        </div>
                          <div className="form-group">
                            <input
                              type="password"
                              className="form-control form-control-user fs-6"
                              id="exampleInputPassword"
                              placeholder="Enter your password"
                              onChange={(e) => setPassword(e.target.value)}
                              autoComplete="none"
                              disabled={isloading}
                            />
                          </div>
                        <button
                          onClick={(e) => handleSubmit(e)}
                          className={
                            isloading
                              ? "btn btn-primary btn-user btn-block disabled  fw-bold  fs-6"
                              : "btn btn-primary btn-user btn-block fw-bold  fs-6"
                          }
                        >
                          {isloading ? (
                            <div
                              className="spinner-border spinner-border-sm"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </div>
                          ) : (
                            "Login"
                          )}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
