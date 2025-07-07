import { useState, useEffect } from "react"
import { toyService } from "../../../services/toy.service"
import { NavLink, Outlet } from "react-router"


export function About(){
    
    const [toys, setToys] = useState([])
    useEffect(()=>{
        toyService.query()
            .then(setToys)
    })
    return(
        <div className='about-container'>    
            <h1>About missToys</h1>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque sit repellendus earum enim assumenda voluptatem consequatur optio eveniet velit aliquid, voluptate corporis, illum architecto cupiditate porro ex laborum nulla! Laborum?</p> 
            <div className="about-sub-sections-links-container">
                <NavLink to='/about/vision'>Vision</NavLink>
                <NavLink to='/about/team'>Team</NavLink>
            </div>   
            <Outlet />
        </div>
        
    )
}