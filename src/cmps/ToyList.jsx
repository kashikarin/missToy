import { Link } from "react-router"
import { ToyPreview } from "./ToyPreview.jsx"
import Loader from '../assets/images/Loader.svg'  

export function ToyList({toys, onRemoveToy}){
    
    const removeIcon = <i className="fa fa-trash"></i>
    const detailsIcon = <i className="fa fa-info"></i>
    const editIcon = <i className="fa fa-edit"></i>

    const loader = <img src={Loader} alt='Loading...' />
    return(
        <ul className="toy-list-container">
            {!Array.isArray(toys) || toys.length === 0? loader : toys.map(toy => <li key={toy._id}>
                <div className="toy-preview-wrapper">
                    <ToyPreview toy={toy} />
                </div>
                <section className='toy-li-buttons-container'>
                    <button onClick={()=>onRemoveToy(toy._id)}>{removeIcon}</button>
                    <Link to={`/toy/${toy._id}`}><button>{detailsIcon}</button></Link>
                    <Link to={`/toy/edit/${toy._id}`}><button>{editIcon}</button></Link>
                </section>
            </li>)}
        </ul>
    )
}