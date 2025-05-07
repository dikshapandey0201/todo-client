import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { logout } from '../../api/authApi';
import Toast from '../../component/Toast';
import { useState } from 'react';
import type { ToastProps } from '../../component/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../redux/slices/UserSlice';
import type { RootState } from '../../store';
import { useNavigate } from 'react-router-dom';

export default function UserMenu() {
  const { user } = useSelector((state: RootState) => state.user);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [toast, setToast] = useState<ToastProps | null>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  async function handleLogout() {
    const response = await logout();
    if (response.success) {
      setToast({
        message: response.message,
        type: 'success',
        onClose: () => setToast(null),
      });
    }
    dispatch(clearUser());
    window.location.href = '/';
  }
  function handleProfile() {
    navigate('/profile');
  }


  return (
    <div>
      <button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <span className="flex gap-2 items-center">
          {user?.name?.split(' ')[0]}
          <KeyboardArrowDownSharpIcon className="dark:text-white" />
        </span>
      </button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ '& .MuiPaper-root': { minWidth: 200 } }} 
        slotProps={{
          paper: {
            className:
              'bg-white dark:bg-gray-800 text-black dark:text-white',
          },
        }}
      >
        <MenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2" onClick={handleProfile}>Profile</MenuItem>
        <MenuItem className="hover:bg-gray-100 dark:hover:bg-gray-700 px-4 py-2" onClick={handleLogout}>
          Logout
        </MenuItem>
      </Menu>


      {toast && <Toast {...toast} />}
    </div>
  );
}
