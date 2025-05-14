import React from 'react';
import { Link } from "react-router-dom";
import CCH from "../assets/concertohome.jpg";
import "../styles/Home.css";
import { MenuList } from '../helpers/MenuList';

function Home() {
    const featuredEvents = MenuList.filter(item => item.name.includes("Concert BlackPink") || item.name.includes("Concert 30/4") || item.name.includes("Anh trai vuot ngan") || item.name.includes("Concert GD Korean Concert"));

    return (
        <div className='home'>
            <div className='headerContainer' style={{ backgroundImage: `url(${CCH})` }}>
                <h1>Concert For You</h1>
                <p>CONCERT NOW</p>
                <Link to="/menu">
                    <button> Buy Now </button>
                </Link>
            </div>
            {/* Featured Events nằm riêng bên dưới, không đè lên background */}
            <div className='featuredEvents'>
                <h2>Featured Events</h2>
                <div className='eventRow'>
                    {featuredEvents.map((event, index) => (
                        <div key={index} className='eventCard'>
                            <img src={event.image} alt={event.name} />
                            <h3>{event.name}</h3>
                            <p><strong>Date:</strong> {event.ngay}</p>
                            <p><strong>Time:</strong> {event.gio}</p>
                            <p><strong>Price:</strong> {event.price}</p>
                            <Link to="/menu">
                                <button>Buy</button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Home
