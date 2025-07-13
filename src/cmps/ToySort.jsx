import { useState } from "react"
import { useEffectUpdate } from "../../customHooks/useEffectUpdate"

export function ToySort({queryOptions, onSetQueryOptions}){
    
    const [sort, setSort] = useState({sortField: queryOptions.sortField, sortOrder: queryOptions.sortOrder})
    
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
                <select name="sortField" value={sort.sortField} onChange={handleChange}>
                    <option value="">Sort By</option>
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="createdAt">Creation Date</option>
                </select>
                <span className="arrow"><i className="fa fa-chevron-down"></i></span>
            </div>
            <div className="sort-order-container">
                <label htmlFor="sortOrder">
                    Desc
                    <input type='checkbox' id='sortOrder' disabled={sort.sortField === ""} checked={sort.sortOrder === -1} value={sort.sortOrder} name='sortOrder' onChange={handleChange}/>
                </label>
            </div>
        </div>
    )
}