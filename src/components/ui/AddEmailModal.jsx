import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEmail, addSubUser } from "../../redux/projects/action";
import { useParams } from "react-router-dom";

const AddEmailModal = () => {
  const { key } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    from_email: "",
    from_name: "",
    address: "",
    city: "",
    country: "",
    zip: "",
    nickname: "",
  });

  const dispatch = useDispatch();

  const toggleModal = () => {
    setIsOpen(!isOpen);
    setFormData({
      from_email: "",
      from_name: "",
      address: "",
      city: "",
      country: "",
      zip: "",
      nickname: "",
    });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    dispatch(addEmail({ secret_key: key, ...formData }));
    setIsOpen(false);
  };

  return (
    <div>
      <div className="flex justify-end mt-2">
        <button
          onClick={toggleModal}
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm p-3 text-center"
        >
          Add New Email
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
          <div className="relative p-4 max-w-4xl w-full bg-white rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add New Email</h3>
              <button
                onClick={toggleModal}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
              >
                <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>

            <div>
              {Object.keys(formData)?.map((field) => (
                <input
                  key={field}
                  type="text"
                  className="w-full text-gray-800 p-2 border border-gray-300 rounded-lg mb-4"
                  placeholder={field.replace("_", " ").toUpperCase()}
                  name={field}
                  value={formData[field]}
                  onChange={handleInputChange}
                />
              ))}
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddEmailModal;
