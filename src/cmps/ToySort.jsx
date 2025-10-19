import { useState } from "react"
import { useEffectUpdate } from "../../customHooks/useEffectUpdate"
import { useSelector } from "react-redux"

export function ToySort({queryOptions, onSetQueryOptions}){
    const [isToySortDropdownOpen, setIsToySortDropdownOpen] = useState(false)
    const [sort, setSort] = useState({sortField: queryOptions.sortField, sortOrder: queryOptions.sortOrder})
    const isMobile = useSelector(state => state.systemModule.isMobile)
    
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
                <select 
                    name="sortField" 
                    value={sort.sortField} 
                    onChange={handleChange}
                    onClick={() => setIsToySortDropdownOpen(prev => !prev)}
                >
                    <option value="">Sort By</option>
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="createdAt">Creation Date</option>
                </select>
                <span>{isToySortDropdownOpen ? "▲" : "▼"}</span>
                {/* <span className="arrow"><i className="fa fa-chevron-down"></i></span> */}
            </div>
            <div className="sort-order-container">
                {!isMobile ? 
                (<label htmlFor="sortOrder">
                    <input type='checkbox' id='sortOrder' disabled={sort.sortField === ""} checked={sort.sortOrder === -1} value={sort.sortOrder} name='sortOrder' onChange={handleChange}/>
                    Desc
                </label>) :
                (<button
                    className="sort-direction-btn"
                    onClick={() =>
                    setSort(prev => ({
                        ...prev,
                        sortOrder: prev.sortOrder === 1 ? -1 : 1
                    }))
                    }
                    disabled={!sort.sortField}
                >
                    {sort.sortOrder === 1 ? 
                        <i class="fa-solid fa-arrow-down"></i> : 
                        <i class="fa-solid fa-arrow-up"></i>
                    }
                </button>)
                }
            </div>
        </div>
    )
}