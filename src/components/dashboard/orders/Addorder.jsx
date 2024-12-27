import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams, Link } from "react-router-dom";
import ImageUploader from "../../utils/ImageUploader";

const addbooking = () => {
  const { id } = useParams();
  const [category, selectCategory] = useState("");
  const [categoryName, setCategoryName] = useState([]);
  const [brandName, setBrandName] = useState([]);
  const [brand, setBrand] = useState("");
  const [name, ProductName] = useState("");
  const [qtyOnHand, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [imageUrls, setImageUrl] = useState([]);
  const [isloading, setLoading] = useState(false);

  return (
    <div className="card shadow">
    <div className="card-header py-3 d-sm-flex align-items-center justify-content-between">
    <Link to="/dashboard/products"><i className="fas fa-arrow-left"></i> </Link>
      <h6 className="m-0 font-weight-bold text-primary">
        {id ? "Update Booking" : "Add new Booking"}
      </h6>
    <div>{""}</div>
    </div>
    <div className="card-body">
      <div>
        <form>
          <div className="row mb-4">
            <div className="col">
              <label className="form-label" htmlFor="form6Example7">
                Select Category
              </label>
              <select
                className="form-control"
                id="form6Example7"
                value={category}
                onChange={(e) => selectCategory(e.target.value)}
              >
                <option>Choose your option</option>
                {categoryName.map((category, index) => (
                  <option key={index} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col">
              <div data-mdb-input-init className="form-outline">
                <label className="form-label" htmlFor="form6Example7">
                  Select Brand
                </label>
                <select
                  className="form-control"
                  id="form6Example7"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                >
                  <option>Choose your option</option>
                  {brandName.map((brand, index) => (
                    <option key={index} value={brand.name}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col">
              <div data-mdb-input-init className="form-outline">
                <label className="form-label" htmlFor="form6Example6">
                  Product Name
                </label>
                <input
                  type="text"
                  id="form6Example6"
                  className="form-control"
                  value={name}
                  onChange={(e) => ProductName(e.target.value)}
                />
              </div>
            </div>
            <div className="col">
              <div data-mdb-input-init className="form-outline">
                <label className="form-label" htmlFor="form6Example7">
                  Quantity on Hand
                </label>
                <input
                  type="number"
                  id="form6Example7"
                  className="form-control"
                  value={qtyOnHand}
                  onChange={(e) => setQty(e.target.value)}
                />
              </div>
            </div>
            <div className="col">
              <div data-mdb-input-init className="form-outline">
                <label className="form-label" htmlFor="form6Example">
                  Product Price
                </label>
                <input
                  type="number"
                  id="form6Example"
                  className="form-control"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="row mb-5">
            <div className="col">
              <label className="form-label" htmlFor="form6Example7">
                Product Description (This description will appear on the
                product page)
              </label>
              <div style={{ width: "100%", height: 200 }}>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 mt-3 mb-4">
              <label className="form-label" htmlFor="form6Example6">
                Add Product Images (You can add multiple images)
              </label>

              <div>
                <ImageUploader />
              </div>
            </div>
          </div>
          <button
            data-mdb-ripple-init
            type="button"
            className={
              isloading
                ? "btn btn-primary btn-block disabled"
                : "btn btn-primary btn-block"
            }
            onClick={id ? (e) => {} : (e) => {}}
          >
            {isloading ? (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Save Product"
            )}
          </button>
        </form>
      </div>
    </div>
  </div>
  )
}

export default addbooking