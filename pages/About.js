import React from 'react';
import CLH from "../assets/cloudhorizon.jpg";
import "../styles/About.css";

function About() {
    return (
        <div className='about'>
            <div className='aboutTop' style={{ backgroundImage: `url(${CLH})` }}>
                <h1>ABOUT US</h1>
                <p>We are an online concert ticket platform built for music lovers. Our mission is to connect artists and audiences by making live music more accessible. From major tours to intimate indie shows, we offer fast, secure ticket booking and up-to-date event information — so you never miss a beat.</p>
            </div>
            <div className='aboutBottom'>
                <h1>Founders</h1>
                <div className='founders'>
                    <div className='founderCard'>
                        <img src={require("../assets/hung.jpg")} alt="Tran Viet Hung" className='founderAvatar' />
                        <h3>Tran Viet Hung</h3>
                        <p>Leader</p>
                    </div>
                    <div className='founderCard'>
                        <img src={require("../assets/ngoc.jpg")} alt="Dang Phuong Ngoc" className='founderAvatar' />
                        <h3>Dang Phuong Ngoc</h3>
                        <p>Member</p>
                    </div>
                    <div className='founderCard'>
                        <img src={require("../assets/anh.jpg")} alt="Nguyen Nhat Anh" className='founderAvatar' />
                        <h3>Nguyen Nhat Anh</h3>
                        <p>Member</p>
                    </div>
                    <div className='founderCard'>
                        <img src={require("../assets/tran.jpg")} alt="Nguyen Huyen Tran" className='founderAvatar' />
                        <h3>Nguyen Huyen Tran</h3>
                        <p>Member</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default About
