import { useState, useEffect } from "react"
import { toyService } from "../../services/toy.service"
import { ToyList } from "../cmps/ToyList"
import { loadToys } from "../../store/actions/toy.actions"

export function About(){
    
    const [toys, setToys] = useState([])
    useEffect(()=>{
        toyService.query()
            .then(setToys)
    })
    return(
        <div>    
            <ToyList toys={toys}></ToyList>
        
        </div>
        
    )
}