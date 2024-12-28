import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import ImageUploader from "../../utils/ImageUploader"; // Assuming the drag-and-drop utility is here

const AddBook = () => {
  const { id } = useParams();
  const [isbn, setIsbn] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [categoryID, setCategoryID] = useState("");
  const [categories, setCategories] = useState([]);
  const [authorId, setAuthorId] = useState("");
  const [authors, setAuthors] = useState([]);
  const [language, setLanguage] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState("");
  const [image, setImage] = useState(null);
  const [isloading, setLoading] = useState(false);

  const fetchDropdownData = async () => {
    try {
      const categoryRes = await axios.get("https://localhost:7248/api/Category");
      //setCategories(categoryRes.data);
      const authorRes = await axios.get("https://localhost:7248/api/Author");
      //setAuthors(authorRes.data);
    } catch (error) {
      console.error("Error fetching dropdown data", error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!title || !description || !categoryID || !authorId || !language || !price || !qty || !image) {
      toast.error("All fields are required.");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("isbn", isbn);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("categoryID", categoryID);
    formData.append("authorId", authorId);
    formData.append("language", language);
    formData.append("price", price);
    formData.append("qty", qty);
    formData.append("image", image);

    try {
      const response = await axios.post("hhttps://localhost:7248/api/Book", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Book added successfully");
      setIsbn("");
      setTitle("");
      setDescription("");
      setCategoryID("");
      setAuthorId("");
      setLanguage("");
      setPrice("");
      setQty("");
      setImage(null);
    } catch (error) {
      toast.error("Failed to add book");
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDropdownData();
    if (id) {
      axios
        .get(`https://localhost:7248/api/Book/${id}`)
        .then((res) => {
          const data = res.data.message;
          setIsbn(data.isbn);
          setTitle(data.title);
          setDescription(data.description);
          setCategoryID(data.categoryID);
          setAuthorId(data.authorId);
          setLanguage(data.language);
          setPrice(data.price);
          setQty(data.qty);
          setImage(data.image);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

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
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="form-label" htmlFor="title">Book Title</label>
            <input
              type="text"
              id="title"
              className="form-control"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="form-label" htmlFor="description">Description</label>
            <textarea
              id="description"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="form-label" htmlFor="category">Category</label>
            <select
              id="category"
              className="form-control"
              value={categoryID}
              onChange={(e) => setCategoryID(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="form-label" htmlFor="author">Author</label>
            <select
              id="author"
              className="form-control"
              value={authorId}
              onChange={(e) => setAuthorId(e.target.value)}
            >
              <option value="">Select Author</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="form-label" htmlFor="language">Language</label>
            <input
              type="text"
              id="language"
              className="form-control"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="form-label" htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              className="form-control"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="form-label" htmlFor="qty">Quantity</label>
            <input
              type="number"
              id="qty"
              className="form-control"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="form-label" htmlFor="image">Book Image</label>
            <ImageUploader setImage={setImage} />
          </div>
          <button
            type="submit"
            className={isloading ? "btn btn-primary disabled" : "btn btn-primary"}
            disabled={isloading}
          >
            {isloading ? (
              <div className="spinner-border spinner-border-sm" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              id ? "Update Book" : "Add New Book"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
