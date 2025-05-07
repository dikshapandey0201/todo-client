import bg from '../../assets/homeBg.jpg'
import logo from '../../assets/logo.png';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import { useEffect, useState } from 'react';
import { currentUser, signin, signup } from '../../api/authApi';
import Toast from '../../component/Toast';
import type { ToastProps } from '../../component/Toast';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/UserSlice';
import { useNavigate } from 'react-router-dom';


export default function index() {
  const [formType, setFormType] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<ToastProps | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleFormType = () => {
    setFormType((prev) => (prev === 'signup' ? 'login' : 'signup'));
    setFormData({ name: '', email: '', password: '' });
    setShowPassword(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password || (formType === 'signup' && !formData.name)) {
      alert('Please fill all fields');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }

    if (formData.password.length < 8) {
      alert('Password must be at least 6 characters long');
      return;
    }
 
    if (formType === 'signup' && formData.name.length < 3) {
      alert('Name must be at least 3 characters long');
      return;
    }
    if (formType === 'signup') {
      
      try {
        setLoading(true);
        const response = await signup(formData.name, formData.email, formData.password);
        if (response.success) {
          setToast({ message: 'Signup successful!', type: 'success', onClose: () => setToast(null) });
          setFormType('login'); 
        }else {
          setToast({ message: response.message, type: 'error', onClose: () => setToast(null) });
        }
      } catch (error) {
        console.error('Signup failed:', error);
        alert('Signup failed. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      
      try {
        setLoading(true);
        const response = await signin(formData.email, formData.password);
        if (response.success) {
          setToast({ message: response.message, type: 'success', onClose: () => setToast(null) });
          window.location.href = '/'; 

        } else {
          setToast({ message: response.message, type: 'error', onClose: () => setToast(null) });
        }
      } catch (error) {
        console.error('Login failed:', error);
        alert('Login failed. Please try again.');
      } finally {
        setLoading(false);
      }

    }
  };
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await currentUser();
        dispatch(setUser(response.user))
        if (response.user) {
          navigate('/dashboard'); 
        }
        
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
  
    fetchUser();
  }, []);

  return (
    <div className="w-full h-screen flex md:flex-row flex-col-reverse items-center">
      
      <section className="flex-1 hidden md:block h-screen bg-cover bg-center" >
        <img src={bg} alt="" className="h-full"/>
      </section>

      
      <section className="md:w-1/3 w-full flex flex-col justify-center items-center h-screen px-6">
        
        <div className="flex justify-center items-center gap-2 mb-20">
          <img src={logo} alt="Logo" className="w-10" />
          <h1 className="text-4xl font-extrabold text-green-600">Todo</h1>
        </div>

        
        <h1 className="text-3xl font-bold text-center mb-10">
          {formType === 'signup' ? 'Create an account' : 'Welcome back!'}
        </h1>

        
        <form className="flex flex-col gap-4 w-full max-w-md"  onSubmit={handleSubmit}>
          
          {formType === 'signup' && (
            <div className="relative">
              <PersonOutlineIcon className="absolute text-gray-500 top-1/2 left-3 -translate-y-1/2" />
              <input
                name="name"
                type="text"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full h-12 px-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
          )}

         
          <div className="relative">
            <AlternateEmailIcon className="absolute text-gray-500 top-1/2 left-3 -translate-y-1/2" />
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full h-12 px-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
          </div>

          
          <div className="relative">
            <HttpsOutlinedIcon className="absolute text-gray-500 top-1/2 left-3 -translate-y-1/2" />
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full h-12 px-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600"
              required
            />
            <span
              className="absolute right-2 top-1/2 -translate-y-1/2"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <VisibilityOffOutlinedIcon className="text-gray-500" />
              ) : (
                <VisibilityOutlinedIcon className="text-gray-500" />
              )}
            </span>
          </div>

         
          <button
            type="submit"
            className="bg-green-600 text-white h-12 rounded-full font-semibold hover:bg-green-700 transition"
          >
            {loading ? 'Please wait...' : formType === 'signup' ? 'Sign Up' : 'Login'}
          </button>

       
          <p className="text-center text-sm text-gray-600">
            {formType === 'signup' ? 'Already signed in?' : 'New here?'}{' '}
            <span
              className="text-green-600 font-semibold cursor-pointer"
              onClick={toggleFormType}
            >
              {formType === 'signup' ? 'Login' : 'Sign Up'}
            </span>
          </p>
        </form>
      </section>
        
  
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            duration={3000}
            onClose={() => setToast(null)}
          />
        )}
    </div>
  );
}
