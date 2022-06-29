import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import './landing.css';
import { Carousel } from 'react-responsive-carousel';
import { Link } from "react-router-dom";

function landing() {
    return (

            <Carousel showThumbs={false} showStatus={false} showArrows={true}>
                <div>
                    <img className='carousel_img' src="images/dogpark.jpeg" />
                    <div className='des3'>
                        <h1 className='des_title'>Where are the furr babies?</h1>
                        <Link to='/home'><button className='des_btn'>Search a park</button></Link>
                    </div>
                </div>

                 <div >
                    <img className='carousel_img' src="images/tennis5fixed.webp" />
                    <div className='des1'>
                        <h1 className='des_title'>Looking for a court?</h1>
                        <Link to='/home'><button className='des_btn'>Search a park</button></Link>

                    </div>
                </div>

                <div>
                    <img className='carousel_img' src="images/hiking.jpeg" />
                    <div className='des2'>
                        <h1 className='des_title'>Curious about trail traffic?</h1>
                        <Link to='/home'><button className='des_btn'>Search a trail</button></Link>
                    </div>
                </div>
               
               
                
            </Carousel>


    )
}

export default landing;