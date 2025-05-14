import React from 'react'
import QG from "../assets/bodoicamco.png";
import { Link } from 'react-router';
import Login from '../pages/Login';

function MenuItem({ image, name, ngay, gio, price }) {
    console.log(name, ngay, gio, price); //kiểm tra giá trị props
    return (
        <div className='menuItem'>
            <div style={{ backgroundImage: `url(${image || QG})` }} className='menuItemImage'></div>
            <h1>{name}</h1> {/*hiển thị tên concert*/}
            <h2>{ngay}</h2> {/*hiển thị tên concert*/}
            <h3>{gio}</h3> {/*hiển thị tên concert*/}
            <p>{price}</p>   {/*hiển thị giá concert*/}
            <Link to={Login}>
                <button> Buy</button>
            </Link>
        </div>
    )
}

export default MenuItem
