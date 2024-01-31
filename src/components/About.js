import axios from "axios";
import React, { useEffect, useState } from "react";
import classes from "./components.module.css"
import Row from "./Row";


const About = ({children, onClick, ...props}) => {

    const [joke, setJoke] = useState()
    const [gif, setGif] = useState()

    useEffect(()=>{
        async function loadJoke(){
            let {data} = await axios.get('https://geek-jokes.sameerkumar.website/api?format=json')
            setJoke(data.joke)
        }
        async function loadGif(){
            let {data} = await axios.get('https://yesno.wtf/api')
            setGif(data.image)
        }
        loadJoke()
        loadGif()
    },[])

    return(
        <div>
            <div class = {classes.pageText}>
            <Row>{joke}</Row>
            <img src={gif}></img>
            <img src = {require('../static/da.jpg')} height="250px" style={{margin:'0px 50px 0px 0px'}}/>
            <h1>Welcome to Beauty Club</h1>
        <h2>Our Vision</h2>
        <p>Beauty Club was founded with a clear vision in mind: to create a sanctuary where you can escape the stresses of everyday life and indulge in self-care. We believe that beauty is not just skin deep; it's a reflection of how you feel, both physically and emotionally. Our mission is to empower you to embrace your individuality and boost your confidence through our wide range of beauty and wellness services.</p>

        <h2>Our Services</h2>
        <ul>
            <li><strong>Hair Care:</strong> Whether you're looking for a new hairstyle, a fresh color, or a revitalizing hair treatment, our talented stylists are here to make your hair dreams a reality.</li>
            <li><strong>Skin Care:</strong> Our expert estheticians provide customized facials, rejuvenating treatments, and skincare routines tailored to your specific skin type and concerns.</li>
            <li><strong>Nail Care:</strong> Pamper yourself with our manicures and pedicures that will leave your hands and feet looking and feeling fabulous.</li>
            <li><strong>Makeup Artistry:</strong> Our makeup artists can enhance your natural beauty for any occasion, from everyday looks to special events.</li>
            <li><strong>Spa Services:</strong> Relax and unwind with our spa services, including massages, body treatments, and waxing, all designed to soothe your body and mind.</li>
            <li><strong>Cosmetic Procedures:</strong> For those seeking more advanced treatments, we offer a range of cosmetic procedures performed by licensed professionals.</li>
        </ul>

        <h2>Our Team</h2>
        <p>The heart of Beauty Club lies within our dedicated team of highly trained and passionate professionals. They are committed to staying up-to-date with the latest industry trends and techniques, ensuring you receive the best possible service. Our team's friendly and welcoming demeanor will make you feel right at home.</p>

        <h2>Your Experience</h2>
        <p>At Beauty Club, we focus on delivering not just exceptional services, but an unforgettable experience. From the moment you step through our doors, you will be greeted with warmth and care. Our goal is to create a tranquil and welcoming atmosphere where you can relax and let your beauty shine.</p>
        <p>We use only the highest quality products and tools, and we pay meticulous attention to detail to ensure your satisfaction. Your trust in us is our greatest reward.</p>
    
            </div>
            
        </div>
    )
}

export default About