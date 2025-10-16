import { NavLink, Outlet } from "react-router"


export function About(){
    
   
    return(
        <div className='about-container'>    
            <div className="about-main-content">
                <h1>About missToy</h1>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque sit repellendus earum enim assumenda voluptatem consequatur optio eveniet velit aliquid, voluptate corporis, illum architecto cupiditate porro ex laborum nulla! Laborum?</p> 
            </div>
            <div className="about-sub-sections-links-container">
                <NavLink to='/about/vision'>Vision</NavLink>
                <NavLink to='/about/team'>Team</NavLink>
            </div>   
            <Outlet />
        </div>
        
    )
}