import { useEffect,useState } from "react"
import { Link, useNavigate, useParams } from "react-router"
import { toyService } from "../../services/toy.service"
import { utilService } from "../../services/util.service"


export function ToyDetails(){
    const params = useParams()
    const [toy, setToy] = useState(null)

    useEffect(()=>{
            if (params.toyId) {
                loadToy()
            }
        }, [params.toyId])
        
    async function loadToy(){
        try {
            const toy = await toyService.getById(params.toyId)
            setToy(toy)
        } catch(err) {  
            console.log('Failed to load toy', err)
        }
    }
    if (!toy) return <h3>Loading...</h3>
    return(
        <div className="toy-details-wrapper">
                <section className="toy-details-container">
                <img src={toy.imageUrl} alt={`${toy.name}'s image`} />
                <article className="toy-info-container">
                    <p className="toy-detail-line">
                        <span className='p-label'>Name:</span>
                        <span>{toy.name}</span>
                    </p>
                    <p className="toy-detail-line">
                        <span className='p-label'>Price:</span>
                        <span>{toy.price}EUR</span>
                    </p>
                    <p className="toy-detail-line">
                        <span className='p-label'>Labels: </span>
                        <span>{[...toy.labels]}</span>
                    </p>
                    <p className="toy-detail-line">
                        <span className='p-label'>Stock Status: </span>
                        <span>{toy.status? 'In Stock' : 'Soldout'}</span>
                    </p>
                    <p className="toy-detail-line">
                        <span className='p-label'>Creation Date: </span>
                        <span>{utilService.getFormattedDate(toy.createdAt)}</span>
                    </p>
                </article>
                <Link className='button-like' to='/toy'>Back</Link>
            </section>
        </div>
        
    )
}