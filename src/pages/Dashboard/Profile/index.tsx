import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import type { RootState } from "../../../store";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import logo from '../../../assets/logo.png';
import { deleteUser, logout, updateUser } from "../../../api/authApi";
import { clearUser, setUser } from "../../../redux/slices/UserSlice";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user } = useSelector((state: RootState) => state.user);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isUnchanged = name === user?.name && email === user?.email;

  async function handleUpdate() {
    const response = await updateUser(name, email);
    if (response.success) {
      alert("Profile updated successfully");
      dispatch(setUser(response.user))
    } else {
      alert("Failed to update profile");
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm("Are you sure you want to delete your account?");
    if (!confirmed) return;
    const response = await deleteUser();
    if (response.success) {
      dispatch(clearUser());

    } else {
      alert("Failed to delete account");
    }
  }

  async function handleLogout() {
    const response = await logout();
    if (response.success) {
      dispatch(clearUser());
      window.location.href = '/';
    }
  }

  function handleBack() {
    navigate('/dashboard');
  }

  return (
    <div className="flex py-10 justify-center h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="relative bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 w-full max-w-md text-gray-800 dark:text-white">

        <button
          onClick={handleBack}
          className="absolute top-4 left-4 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition bg-gray-200 dark:bg-gray-700 rounded-full p-1 h-8 w-8"
        >
          <ArrowBackIcon fontSize="small" />
        </button>

        <div className="flex justify-center mt-20">
          <img src={logo} alt="Logo" className="h-12" />
        </div>

        <h1 className="text-2xl font-bold text-center my-10">Profile</h1>

        <div className="mb-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Name"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white mt-4"
            placeholder="Email"
          />
        </div>


        <div className="flex flex-col gap-3">
          <button
            className={`px-4 py-2 rounded transition duration-200 text-white ${isUnchanged ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
              }`}
            disabled={isUnchanged}
            onClick={handleUpdate}
          >
            Update
          </button>

          <button
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition duration-200"
            onClick={handleLogout}
          >
            Logout
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"

            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
