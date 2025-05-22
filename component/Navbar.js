//gõ rfce để ra từ 2-12: react functional component export
import React, { useState } from 'react'
import logo from '../assets/logoconcert.png'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Navbar.css'
import ReorderIcon from '@mui/icons-material/Reorder';

function Navbar() {

    const [openLinks, setOpenLinks] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false); // dòng này cho dropdown các mục trong khi nhấp vào nút email
    const navigate = useNavigate();

    const toggleNavbar = () => {
        setOpenLinks(!openLinks)
    };
    const user = JSON.parse(localStorage.getItem('user'));
    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/login');
    }

    const handleProfileClick = () => {
        navigate('/signup'); // Trang signup sẽ hiển thị ở chế độ profile nếu user đã login
    };


    return (
        <div className="navbar">
            <div className='leftSide' id={openLinks ? "open" : "close"}>
                <img src={logo} alt="logo of concert ticket web" />
                <div className='hiddenLinks'>
                    <Link to="/">Home</Link>
                    <Link to="/menu">Menu</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                    {!user && <Link to="/login">Login</Link>}
                </div>
            </div>

            <div className='rightSide'>
                <Link to="/">Home</Link>
                <Link to="/menu">Menu</Link>
                <Link to="/about">About</Link>
                <Link to="/contact">Contact</Link>
                {user ? (
                    <div className='user-menu'>
                        <span
                            className='user-email'
                            onClick={() => setShowUserMenu(!showUserMenu)}
                        >
                            {user.email}
                        </span>
                        {showUserMenu && (
                            <div className="dropdown-menu">
                                <div onClick={handleProfileClick}>Thong tin khach hang</div>
                                <div onClick={handleLogout}>Logout</div>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to="/login">Login</Link>
                )}
                <button onClick={toggleNavbar}>
                    <ReorderIcon />
                </button>
            </div>
        </div>
    )
}

export default Navbar
