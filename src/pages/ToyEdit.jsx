import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { toyService } from "../../services/toy.service"
import { saveToy } from "../../store/actions/toy.actions"
import Loader from '../assets/images/Loader.svg'

export function ToyEdit(){
    const params = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const emptyToy = {name: '', price: '', status: true}
    const [toyToEdit, setToyToEdit] = useState(emptyToy)
    const navigate = useNavigate()
    useEffect(()=>{
        if (params.toyId) {
            loadToy()
        }
    }, [])
    
    async function loadToy(){
        try {
            const toy = await toyService.getById(params.toyId)
            setToyToEdit(toy)
        } catch(err) {  
            console.log('Failed to load toy')
        }
    }
    function handleChange({target}){
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break
            case 'select-one':
                if (field === 'status') value = value === 'true'
            default: break
        }

        setToyToEdit(prevToyToEdit => ({ ...prevToyToEdit, [field]: value }))
    }

    async function handleSubmit(ev) {
        ev.preventDefault()
        setIsLoading(true)

        const toyToSave = {
            ...toyToEdit,
            status: toyToEdit.status === 'true',
            imageUrl: toyService.getToyImageUrl(toyToEdit.name)
        }

        await saveToy(toyToSave)
        navigate('/toy')
    }
    
    const loader = <img style={{width: '100%', height: '100%', objectFit: 'contain'}}src={Loader} alt='Saving...'/>
    const {name, price, status} = toyToEdit

    return(
        <div className="toy-edit-wrapper">
            <section className="edit-toy-container">
                <h3>{params.toyId? "Update a Toy" : "Add a Toy" }</h3>
                <form onSubmit={handleSubmit}>
                    <div className="edit-inputs-wrapper">
                        <input type="text" name='name' autoComplete='off' value={name} placeholder='Toy Name' onChange={handleChange}/>
                        <input type="number" name='price' value={price} placeholder='Toy Price' onChange={handleChange}/>
                        <select name="status" value={String(toyToEdit.status)} onChange={handleChange} >
                            <option value={'true'}>In Stock</option>
                            <option value={'false'}>Sold out</option>
                        </select>
                    </div>
                    <button className='save-toy-btn' style={{padding: "0"}}>{isLoading? loader : 'Save'}</button>
                </form>
            </section>
        </div>
        
        
    )
}