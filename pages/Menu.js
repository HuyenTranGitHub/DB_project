import React, { useState } from 'react';
//import { Link } from "react-router-dom";
import { MenuList } from "../helpers/MenuList";
import "../styles/Menu.css";
import MenuItem from '../component/MenuItem';
//import Login from './Login';

function Menu() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredMenu = MenuList.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className='menu'>
            <h1 className='menuTitle'>Our Menu</h1>

            <input
                type="text"
                placeholder="🔍 Find concert..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="searchBar"
            />

            <div className='menuList'>
                {filteredMenu.length > 0 ? (
                    filteredMenu.map((menuItem, key) => (
                        <MenuItem
                            key={key}
                            image={menuItem.image}
                            name={menuItem.name}
                            ngay={menuItem.ngay}
                            gio={menuItem.gio}
                            price={menuItem.price}
                        />
                    ))) : (
                    <p className="noResult">Cannot find...</p>
                )}
            </div>
        </div>
    );
}

export default Menu;
