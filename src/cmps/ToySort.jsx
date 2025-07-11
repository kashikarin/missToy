import { useState, useEffect } from "react"
import { useEffectUpdate } from "../../customHooks/useEffectUpdate"

export function ToySort({onSetQueryOptions}){
    
    const [sort, setSort] = useState({sort: '', sortOrder: ''})
    console.log(sort.sort);
    
    useEffectUpdate(()=>{
        onSetQueryOptions(sort)
    }, [sort])

    function handleChange({target}){       
        const field = target.name
        let value = target.value
        if (target.type === 'checkbox') {
           value = target.checked ? -1 : 1;
        }
        setSort(prevSort => ({ ...prevSort, [field]: value }))
    }

    return(
        <div className="toysort-wrapper">
            <div className="toysort-select-wrapper">
                <select name="sort" id="sort" value={sort.sort} onChange={handleChange}>
                    <option value="">Sort By</option>
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="createdAt">Creation Date</option>
                </select>
                <span className="arrow"><i className="fa fa-chevron-down"></i></span>
            </div>
            <div className="sort-order-container">
                <input type='checkbox' id='sortOrder' checked={sort.sortOrder === -1} value={sort.sortOrder} name='sortOrder' onChange={handleChange}/>
                <label htmlFor="sortOrder">Desc</label>
            </div>
        </div>
    )
}