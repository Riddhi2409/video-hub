import React, { useState, useRef, useEffect } from 'react';
import './Navbar.css'; // Make sure to include your styles
import Avatar from 'react-avatar';
import { useAuth } from '../../contexts/authContext';
import { doSignOut } from '../../firebase/auth';
import { useNavigate } from 'react-router-dom';
const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
 const {url,currentUser}= useAuth();
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
  const navigate=useNavigate();
const onLogout=()=>{
    doSignOut().then(() => { navigate('/login') })
    console.log("LOgout");
}
  return (
    <div className="user-menu" ref={menuRef}>
     {url?
                <div className="App">
             <img src={url} alt="User Icon" className="user-icon" onClick={handleToggle} /> 
                </div>
                :
                <div className="client">
            <Avatar onClick={handleToggle} name={currentUser.email[0]} size={35} round="14px" /></div>
                }
     
      {isOpen && (
        <div className="dropdown-menu">
          <button onClick={onLogout} className="logout-button">Logout</button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
