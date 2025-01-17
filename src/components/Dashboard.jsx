import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { RiStickyNoteAddFill } from "react-icons/ri";
import ProductForm from "./ProductForm"; // Import the ProductForm component

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [formData, setFormData] = useState({});

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    // Fetch products from the API
    axios
      .get("http://localhost:8000/api/v1/products")
      .then((response) => {
        setProducts(response.data); // Adjust based on your actual API response format
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const openPopup = (product) => {
    setCurrentProduct(product);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setCurrentProduct(null);
  };

  const deleteProduct = async (product) => {
    try {
      // Ensure to include the authentication token if required
      const response = await axios.delete(
        `http://localhost:8000/api/v1/products/${product._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Use localStorage or other method to get the token
          },
        }
      );

      console.log(response.data);

      // Update the products state by filtering out the deleted product
      setProducts(products.filter((item) => item._id !== product._id));
      alert("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
      // Optionally display an error message to the user
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setFormData((prevFiles) => ({
        ...prevFiles,
        [name]: [...files],
      }));
    } else if (name === "Image") {
      setFormData((prevFiles) => ({
        ...prevFiles,
        [name]: files[0] || null,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.images.length > 3) {
        alert("You can upload a maximum of 3 images");
        return;
      }
      // Make a POST request to create the product
      const response = await axios.post(
        "http://localhost:8000/api/v1/products",
        JSON.stringify(formData),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status !== 201) {
        console.error("Failed to create product:", response.data);
        alert("Failed to create product");
        // Optionally display an error message to the user
      } else {
        console.log("Product created successfully:", response.data);

        // Update the products state with the new product
        setProducts([...products, response.data]);
        alert("Product created successfully");
        closeModal();
      }
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to create product");
      // Optionally display an error message to the user
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <div>
        {/* Icon to open the modal */}
        <div className="h-[300px] flex justify-center items-center mt-10">
          <div
            className="border-2 border-gray-400 cursor-pointer p-4"
            onClick={openModal}
          >
            <RiStickyNoteAddFill size={150} />
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="w-full flex justify-center">
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div
                className="fixed inset-0 bg-black opacity-50"
                onClick={closeModal}
              />
              <div className="bg-white p-6 rounded-lg shadow-lg z-10 max-h-[90vh] w-[70%] overflow-y-auto">
                <button
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
                  onClick={closeModal}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <form
                  onSubmit={handleSubmit}
                  encType="multipart/form-data"
                  className="flex flex-col space-y-4"
                >
                  {/* Product Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Product Name:
                    </label>
                    <input
                      onChange={handleChange}
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Product ID */}
                  <div>
                    <label
                      htmlFor="product_id"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Product ID:
                    </label>
                    <input
                      onChange={handleChange}
                      type="text"
                      id="product_id"
                      name="product_id"
                      required
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label
                      htmlFor="desc"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Description:
                    </label>
                    <textarea
                      id="desc"
                      name="desc"
                      required
                      onChange={handleChange}
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    ></textarea>
                  </div>

                  {/* Price */}
                  <div>
                    <label
                      htmlFor="price"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Price:
                    </label>
                    <input
                      onChange={handleChange}
                      type="number"
                      id="price"
                      name="price"
                      step="0.01"
                      required
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label
                      htmlFor="category"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Category:
                    </label>
                    <input
                      onChange={handleChange}
                      type="text"
                      id="category"
                      name="category"
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Quantity */}
                  <div>
                    <label
                      htmlFor="quantity"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Quantity:
                    </label>
                    <input
                      onChange={handleChange}
                      type="number"
                      id="quantity"
                      name="quantity"
                      required
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Count in Stock */}
                  <div>
                    <label
                      htmlFor="countInStock"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Count In Stock:
                    </label>
                    <input
                      onChange={handleChange}
                      type="number"
                      id="countInStock"
                      name="countInStock"
                      required
                      className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Main Image */}
                  <div>
                    <label
                      htmlFor="Image"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Main Image:
                    </label>
                    <input
                      type="file"
                      id="Image"
                      name="Image"
                      accept="image/*"
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>

                  {/* Additional Images */}
                  <div>
                    <label
                      htmlFor="images"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Additional Images:
                    </label>
                    <input
                      type="file"
                      id="images"
                      name="images"
                      onChange={handleChange}
                      accept="image/*"
                      multiple
                      max={5}
                      className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-6 lg:gap-8 mx-4 mt-20">
        {products.length > 0 ? (
          products.map((item) => (
            <div
              key={item._id}
              className="card border rounded-lg overflow-hidden shadow-lg flex flex-col col-span-1"
            >
              <div className="relative w-full pb-[75%]">
                <img
                  src={item.Image}
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
              <div className="p-4 flex-grow">
                <h3 className="mq450:text-sm md:text-base font-bold h-[60px] md:h-[40px]">
                  {item.name}
                </h3>
                <p className="text-gray-600 md:mt-4">₹{item.price}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
                <div className="flex flex-col">
                  {/* <Link
                    to="/shop/product/addtocart"
                    className="inline-block"
                  >
                    <button className="my-4 py-2 px-4 mr-4 bg-[#592D1E] text-white rounded-md hover:bg-gray-800 text-sm sm:text-base">
                      Add to Cart
                    </button>
                  </Link> */}
                  <button
                    onClick={() => openPopup(item)}
                    className="w-full mt-4 rounded-md text-sm sm:text-base bg-blue-500 text-white font-bold px-4 py-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(item)}
                    className="w-full mt-4 rounded-md text-sm sm:text-base bg-red-500 text-white font-bold px-4 py-2"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>You have not added any products yet.</p>
        )}
      </div>

      {isPopupOpen && currentProduct && (
        <ProductForm
          product={currentProduct}
          closePopup={closePopup}
          refreshProducts={() => {
            axios
              .get("http://localhost:8000/api/v1/products")
              .then((response) => setProducts(response.data));
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
