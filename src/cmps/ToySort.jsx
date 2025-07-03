import { useState, useEffect } from "react"

export function ToySort({onSetFilterSort}){
    
    const [sort, setSort] = useState({sort: ''})
    
    useEffect(()=>{
        onSetFilterSort(sort)
    }, [sort])

    function handleChange({target}){       
        setSort({sort: target.value})
    }

    return(
        <div className="toysort-select-wrapper">
            <select name="sort" id="sort" onChange={handleChange}>
                <option value="">Sort By</option>
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="createdAt">Creation Date</option>
            </select>
            <span className="arrow"><i className="fa fa-chevron-down"></i></span>
        </div>
    )
}