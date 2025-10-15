import { useState } from "react"
import { ReactSVG } from 'react-svg'
import { toyService } from "../../services/toy.service"

export function ToyFilterMobileForm({
    queryOptions, 
    toyLabels, 
    onSetQueryOptions, 
    onClearFilter
}){
    const [isFilterMenuClicked, setIsFilterMenuClicked] = useState(false)
    const [localQueryOptions, setLocalQueryOptions] = useState(queryOptions)
    
    function handleChange({target}){
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked ? true : false
                break
            default: 
                value = target.value
                break
        }
        setLocalQueryOptions(prevLocalQueryOptions => ({ ...prevLocalQueryOptions, [field]: value }))
    }

    function toggleLabel(label) {
        setLocalQueryOptions(prev => {
        const labels = prev.labels.includes(label)?
             prev.labels.filter(l => l !== label)
            : [...prev.labels, label]        
            return { ...prev, labels }
        })
    }
    
    if (!queryOptions || !toyLabels) return null
    return(
        <div className={`toy-filter-mobile-container full ${isFilterMenuClicked ? 'expanded' : ''}`}>
            <div className="toy-filter-mobile-wrapper">
                {!isFilterMenuClicked ? 
                    (<button 
                        className="mobile-filter-menu-button" 
                        onClick={()=> setIsFilterMenuClicked(true)} 
                    >
                        <ReactSVG src='svgs/filter-menu.svg'/>                    
                    </button>) :
                    (
                        <div className="toy-filter-mobile-content">
                            <h2>Your perfect toy starts here</h2>
                            <form autoComplete="off" onSubmit={(ev) => ev.preventDefault()}>
                                <label htmlFor="mobile-name-input" className='toy-filter-mobile-name-input'>
                                    Search by name:
                                    <input 
                                        id='mobile-name-input'
                                        type="text" 
                                        name='name' 
                                        onChange={handleChange}
                                        placeholder='Toy name' 
                                        value={localQueryOptions.name}
                                    />
                                </label>
      
                                <div className="toy-filter-mobile-labels-selection">
                                    <span>Search by category:</span>
                                    <ul>
                                        {Array.isArray(toyLabels) && toyLabels.map(l => <li 
                                                key={l}
                                                className={localQueryOptions.labels.includes(l.toLowerCase())? "selected" : ''}
                                                onClick={()=>toggleLabel(l)}
                                            >{l}
                                            </li>
                                        )}
                                    </ul>
                                </div>
                                <label className="toy-filter-mobile-status-toggle-switch">
                                    <input
                                        type="checkbox"
                                        name='status'
                                        checked={localQueryOptions.status}
                                        onChange={handleChange}
                                    />
                                    <span className="switch" />
                                    <span className="label">In stock toys only</span>
                                </label>
                                <div className="toy-filter-mobile-buttons-container">
                                    <button className='close-filter-btn' onClick={()=>setIsFilterMenuClicked(false)}>Close</button>
                                    <button className="submit-filter-btn" onClick={() => {
                                        onSetQueryOptions(localQueryOptions)
                                        setIsFilterMenuClicked(false)
                                    }}>
                                        Submit
                                    </button>
                                    <button className="clear-filter-btn" onClick={()=> setLocalQueryOptions(toyService.getDefaultQueryOptions())}>
                                        Clear filter
                                    </button>
                                    
                                </div>
                            </form>
                        </div>
                    )
                }
            </div>
        </div>
    )
}