import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

const AddCategory = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !description) {
      toast.error("Name and description are required");
      setLoading(false);
      return;
    }

    await axios
      .post("https://localhost:7248/api/Category", {
        name,
        description,
        createAt: new Date().toISOString(),
        updateAt: new Date().toISOString(),
        deletedAt: null,
        books: [],
      })
      .then((res) => {
        toast.success("Category added successfully");
        setName("");
        setDescription("");
      })
      .catch((err) => {
        toast.error("Failed to add category");
        console.log(err);
      });
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`https://localhost:7248/api/Category/${id}`)
        .then((res) => {
          const data = res.data;
          setName(data.name);
          setDescription(data.description);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  const onEdit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await axios
      .put(`https://localhost:7248/api/Category/${id}`, {
        name,
        description,
        updateAt: new Date().toISOString(),
      })
      .then((res) => {
        toast.success("Category updated successfully");
      })
      .catch((err) => {
        toast.error("Failed to update category");
        console.log(err);
      });

    setLoading(false);
  };

  return (
    <div className="card shadow" style={{ marginBottom: "250px" }}>
      <div className="card-header py-3 d-sm-flex align-items-center justify-content-between">
        <Link to="/dashboard/categories">
          <i className="fas fa-arrow-left"></i>{" "}
        </Link>
        <h6 className="m-0 font-weight-bold text-primary">
          {id ? "Update Category" : "Add new Category"}
        </h6>
        <div>{""}</div>
      </div>
      <div className="card-body">
        <form>
          <div className="row mb-4">
            <div className="col">
              <div data-mdb-input-init className="form-outline">
                <label className="form-label" htmlFor="categoryName">
                  Category Name
                </label>
                <input
                  type="text"
                  id="categoryName"
                  className="form-control"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="row mb-4">
            <div className="col">
              <div data-mdb-input-init className="form-outline">
                <label className="form-label" htmlFor="categoryDescription">
                  Description
                </label>
                <textarea
                  id="categoryDescription"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>

          <button
            data-mdb-ripple-init
            type="button"
            className={
              isLoading
                ? "btn btn-primary btn-block disabled"
                : "btn btn-primary btn-block"
            }
            onClick={
              id
                ? (e) => {
                    onEdit(e);
                  }
                : (e) => {
                    onSubmit(e);
                  }
            }
          >
            {isLoading ? (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              id ? "Update Category" : "Save Category"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
