import React,{useState} from 'react'
import './Navbar.css'
import menu_icon from '../../assets/menu.png'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search.png'
import upload_icon from '../../assets/upload.png'
import more_icon from '../../assets/more.png'
import notification_icon from '../../assets/notification.png'
import jack_img from '../../assets/jack.png'
import UserMenu from './UserMenu';
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext'
import Avatar from 'react-avatar';
import { useFun } from '../../contexts/youtubeContext.js'
import { useNavigate } from 'react-router-dom'

const Navbar = ({ setSidebar }) => {
    const navigate=useNavigate();
    const {getVideosBySearch}=useFun();

    const [searchText,setSeachText]=useState('');
    const sidebar_toggle = (e) => {
        setSidebar((prev) => prev === false ? true : false);
    }
    const handleLogout = () => {
        // Your logout logic here
        console.log('User logged out');
      };
    

    return (
        <nav className='flex-div'>
            <div className="nav-left flex-div">
                <img src={menu_icon} alt="" className="menu-icon" onClick={sidebar_toggle} />
                <Link to='/'> <img src={logo} alt="" className="logo" /></Link>
            </div>
            <div className="nav-middle flex-div">
                <div className="search-box flex-div">
                    <input 
                        type="text" 
                        placeholder="Search" 
                        value={searchText} 
                        onChange={(e)=>setSeachText(e.target.value)} onKeyDown={(e)=>{
                            if(e.key==="Enter"){
                                if(searchText.length==0) {
                                    console.log("l")
                                    navigate(`/`)
                                    return;
                                }
                                getVideosBySearch(searchText)
                                console.log(searchText)
                                setSeachText('')
                                navigate(`/search/${searchText}`);
                            }
                        }}/>
                    <img src={search_icon} alt="" />
                </div>
            </div>
            <div className="nav-right flex-div">
                <img src={upload_icon} alt="" />
                <img src={more_icon} alt="" />
                <img src={notification_icon} alt="" />
                <UserMenu />
            </div>
        </nav>
    )
}

export default Navbar
