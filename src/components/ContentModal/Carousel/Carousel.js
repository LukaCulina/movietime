import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { img_300, noPicture } from '../../../config/config';
import { useEffect, useState } from "react";
import './Carousel.css'

const handleDragStart = (e) => e.preventDefault();



const Carousel = ({id, media_type}) => {
const [credits, setCredits] = useState()

const items = credits?.map((c) =>(
  <div className='carouselItem'>
    <img 
      src={c.profile_path ? `${img_300}/${c.profile_path}`:noPicture} 
      alt={c?.name} 
      onDragStart={handleDragStart}
      className='carouselItem_img'
    />
    <b className='carouselItem_txt'>{c?.name}</b>
  </div>
));
 
const responsive ={
  0: {
    items:3,
  },
  512: {
    items:5,
  },
  1024: {
    items:7,
  },
}

  const fetchCredits = async() => {
    const response = await fetch(
        `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=9d226837169e45a79056a5040bd49c77&language=en-US`

    )
    const data = await response.json();
    console.log(data);
    setCredits(data.cast);
};

useEffect(()=>{
    fetchCredits();
    
},[])

  return (
    <AliceCarousel 
      autoPlay 
      responsive={responsive} 
      infinite
      disableDotsControls
      disableButtonsControls
      mouseTracking 
      items={items} 
    />
  );
}

export default Carousel;