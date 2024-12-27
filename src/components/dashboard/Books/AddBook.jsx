import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

const AddBook = () => {
  const { id } = useParams();
  const [isbn, setIsbn] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [language, setLanguage] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const [date, setDate] = useState("");
  const [isloading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!isbn || !title || !author || !category || !language || !price || !qty) {
      toast.error("All fields are required.");
      setLoading(false);
      return;
    }

    await axios
      .post("http://localhost:3000/api/v1/admin/add-book", {
        isbn,
        title,
        author,
        category,
        language,
        price,
        qty,
      })
      .then((res) => {
        toast.success("Book added successfully");
        setIsbn("");
        setTitle("");
        setAuthor("");
        setCategory("");
        setLanguage("");
        setPrice("");
        setQty("");
      })
      .catch((err) => {
        toast.error("Failed to add book");
        console.log(err);
      });
    setLoading(false);
  };

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:3000/api/v1/book/profile/${id}`)
        .then((res) => {
          const data = res.data.message;
          setIsbn(data.isbn);
          setTitle(data.title);
          setAuthor(data.author.name);
          setCategory(data.category.name);
          setLanguage(data.language);
          setPrice(data.price);
          setQty(data.qty);
          setDate(data.updatedAt);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  const onEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios.put(`http://localhost:3000/api/v1/book/update-profile/${id}`, {
      isbn,
      title,
      author,
      category,
      language,
      price,
      qty,
    })
    .then((res) => {
      toast.success("Book updated successfully");
    })
    .catch((err) => {
      toast.error("Failed to update book");
      console.log(err);
    });

    setLoading(false);
  };

  return (
    <div className="card shadow" style={{ marginBottom: "250px" }}>
      <div className="card-header py-3 d-sm-flex align-items-center justify-content-between">
        <Link to="/dashboard/books">
          <i className="fas fa-arrow-left"></i>{" "}
        </Link>
        <h6 className="m-0 font-weight-bold text-primary">
          {id ? "Edit Book" : "Add New Book"}
        </h6>
        <div>{""}</div>
      </div>
      <div className="card-body">
        <div>
          <form>
            <div className="row mb-4">
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <label className="form-label" htmlFor="isbn">
                    ISBN
                  </label>
                  <input
                    type="text"
                    id="isbn"
                    className="form-control"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                  />
                </div>
              </div>
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <label className="form-label" htmlFor="title">
                    Book Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <label className="form-label" htmlFor="author">
                    Author
                  </label>
                  <input
                    type="text"
                    id="author"
                    className="form-control"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </div>
              </div>
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <label className="form-label" htmlFor="category">
                    Category
                  </label>
                  <input
                    type="text"
                    id="category"
                    className="form-control"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <label className="form-label" htmlFor="language">
                    Language
                  </label>
                  <input
                    type="text"
                    id="language"
                    className="form-control"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  />
                </div>
              </div>
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <label className="form-label" htmlFor="price">
                    Price
                  </label>
                  <input
                    type="text"
                    id="price"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="row mb-4">
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <label className="form-label" htmlFor="qty">
                    Quantity
                  </label>
                  <input
                    type="text"
                    id="qty"
                    className="form-control"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                  />
                </div>
              </div>
              <div className="col">
                <div data-mdb-input-init className="form-outline">
                  <label className="form-label" htmlFor="date">
                    Last Updated At
                  </label>
                  <input
                    type="text"
                    id="date"
                    className="form-control"
                    value={date ? new Date(date).toLocaleString() : ""}
                    disabled={true}
                  />
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
              {isloading ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Add New Book"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
