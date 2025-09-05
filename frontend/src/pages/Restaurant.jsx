import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import QrModal from "../components/ui/QrModal";

const Restaurant = () => {
  const { menu, updateMenuItem, removeMenuItem, addMenuItem } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({ name: "", price: "", review: "", image: "" });
  const [imagePreview, setImagePreview] = useState("");
  const navigate = useNavigate();
  const [qrOpen, setQrOpen] = useState(false);

  const openAddModal = () => {
    setForm({ name: "", price: "", review: "", image: "" });
    setImagePreview("");
    setEditIndex(null);
    setModalOpen(true);
  };

  const openEditModal = (idx) => {
    setForm(menu[idx]);
    setImagePreview(menu[idx].image || "");
    setEditIndex(idx);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setForm({ name: "", price: "", review: "", image: "" });
    setImagePreview("");
    setEditIndex(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setForm({ ...form, image: url });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.review) return;
    const item = { ...form, image: form.image || "https://source.unsplash.com/400x300/?food," + encodeURIComponent(form.name) };
    if (editIndex !== null) {
      // Edit mode
      updateMenuItem(editIndex, item);
    } else {
      // Add mode
      addMenuItem(item);
    }
    closeModal();
  };

  const handleDelete = (idx) => {
    removeMenuItem(idx);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar navLinks={["Home", "Menu", "Contact"]} />
      <main className="flex-1 w-full max-w-6xl mx-auto px-2 sm:px-4 py-6 sm:py-12 flex flex-col items-center gap-6 sm:gap-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-orange-600 mb-2 sm:mb-4 text-center font-serif">Menu Management</h1>
        {/* Button Row */}
        <div className="w-full flex flex-col sm:flex-row justify-start sm:items-center mb-4 gap-2 sm:gap-4 ml-0 sm:ml-2 md:ml-4">
          <button
            className="bg-blue-600 text-white font-bold py-2 px-4 sm:px-6 rounded-lg shadow hover:bg-blue-700 transition w-full sm:w-auto"
            onClick={() => navigate('/orders')}
          >
            Customer Orders
          </button>
          <button
            className="bg-orange-500 text-white font-bold py-2 px-4 sm:px-6 rounded-lg shadow hover:bg-orange-600 transition w-full sm:w-auto"
            onClick={openAddModal}
          >
            Add New Menu Item
          </button>
          <button
            className="bg-gray-800 text-white font-bold py-2 px-4 sm:px-6 rounded-lg shadow hover:bg-gray-900 transition w-full sm:w-auto"
            onClick={() => setQrOpen(true)}
          >
            Generate QR
          </button>
        </div>
        {/* Menu List */}
        <div className="w-full max-w-7xl">
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {menu.length === 0 ? (
              <div className="col-span-full text-center text-gray-400">No menu items yet.</div>
            ) : (
              menu.map((item, idx) => (
                <div key={idx} className="bg-white rounded-xl shadow p-3 sm:p-4 flex flex-col gap-2 relative">
                  <img
                    src={item.image || `https://source.unsplash.com/400x300/?food,${encodeURIComponent(item.name)}`}
                    alt={item.name}
                    className="w-full h-28 sm:h-32 object-cover rounded-lg mb-2 cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => navigate('/item-details', { state: { item } })}
                  />
                  <h3 className="font-semibold text-base sm:text-lg text-orange-600">{item.name}</h3>
                  <div className="text-gray-700 font-medium text-sm sm:text-base">{item.price}</div>
                  <div className="text-gray-500 text-xs sm:text-sm italic">{item.review}</div>
                  <div className="flex gap-2 mt-2">
                    <button
                      className="bg-blue-500 text-white px-2 sm:px-3 py-1 rounded hover:bg-blue-600 transition text-xs sm:text-sm"
                      onClick={() => openEditModal(idx)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 sm:px-3 py-1 rounded hover:bg-red-600 transition text-xs sm:text-sm"
                      onClick={() => handleDelete(idx)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        {/* Modal for Add/Edit */}
        {modalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-2">
            <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8 w-full max-w-xs sm:max-w-md relative animate-fade-in-down">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold"
                onClick={closeModal}
                aria-label="Close"
              >
                &times;
              </button>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-orange-600 text-center">
                {editIndex !== null ? "Edit Menu Item" : "Add New Menu Item"}
              </h2>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Food Name"
                  className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-300 outline-none text-sm sm:text-base"
                  required
                />
                <input
                  type="text"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="Price (e.g. $9.99)"
                  className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-300 outline-none text-sm sm:text-base"
                  required
                />
                <input
                  type="text"
                  name="review"
                  value={form.review}
                  onChange={handleChange}
                  placeholder="Short Review"
                  className="px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-300 outline-none text-sm sm:text-base"
                  required
                />
                <div>
                  <label className="block text-gray-700 mb-1 text-sm">Image Upload</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="block w-full text-xs text-gray-500 file:mr-2 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
                  />
                  {imagePreview && (
                    <img src={imagePreview} alt="Preview" className="mt-2 w-full h-24 sm:h-32 object-cover rounded-lg" />
                  )}
                </div>
                <button type="submit" className="bg-orange-500 text-white font-bold py-2 rounded-lg shadow hover:bg-orange-600 transition text-sm sm:text-base">
                  {editIndex !== null ? "Update Item" : "Add Item"}
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
      <Footer />
      <QrModal isOpen={qrOpen} onClose={() => setQrOpen(false)} />
    </div>
  );
};

export default Restaurant;
