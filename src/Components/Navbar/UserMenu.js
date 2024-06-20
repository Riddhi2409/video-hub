import React, { useState, useRef, useEffect } from 'react';
// import './Navbar.css'; // Make sure to include your styles
import { useAuth } from '../../contexts/authContext';
// import { doSignOut } from '../../firebase/auth';
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { photo, email, logout } = useAuth();
  console.log(photo)
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navigate = useNavigate();
  const onLogout = () => {
    logout();
    navigate('/login')
    console.log("LOgout");
  }
  return (
    <div className="user-menu" ref={menuRef}>

      <div className="App">
        <img src={photo} alt="User Icon" className='user-icon'  onClick={handleToggle} />
      </div>



      {isOpen && (
        <div className="dropdown-menu">
          <button onClick={onLogout} className="logout-button">Logout</button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
