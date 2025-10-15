import { Link } from "react-router"
import { ToyPreview } from "./ToyPreview.jsx"
import Loader from '../assets/images/Loader.svg'  
import { useRef } from "react"
import 'animate.css'
import { animateCSS } from "../../services/util.service";


export function ToyList({toys, onRemoveToy}){
    const toyPreviewRef = useRef()
    const removeIcon = <i className="fas fa-trash"></i>
    const detailsIcon = <i className="fas fa-info"></i>
    const editIcon = <i className="fas fa-edit"></i>
    
    async function handleRemove(id){
        await animateCSS(toyPreviewRef.current, 'fadeOut')
        await onRemoveToy(id)
    }

    const loader = <img src={Loader} alt='Loading...' />
    return(
        <ul className="toy-list-container">
            {!Array.isArray(toys) || toys.length === 0? loader : toys.map(toy => <li key={toy._id}>
                <ToyPreview toy={toy}/>
                <section className='toy-li-buttons-container'>
                    <button onClick={()=>{handleRemove(toy._id)}}>{removeIcon}</button>
                    <Link className='button-like' to={`/toy/${toy._id}`}>{detailsIcon}</Link>
                    <Link className='button-like' to={`/toy/edit/${toy._id}`}>{editIcon}</Link>
                </section>
            </li>)}
        </ul>
    )
}