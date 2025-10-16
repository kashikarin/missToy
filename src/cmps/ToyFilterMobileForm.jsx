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
        setLocalQueryOptions(prevLocalQueryOptions => ({ ...prevLocalQueryOptions, [field]: value, [`${field}Changed`]: true }))
    }

    function toggleLabel(label) {
        label = label.toLowerCase()
        setLocalQueryOptions(prev => {
        const labels = prev.labels.includes(label)?
             prev.labels.filter(l => l !== label)
            : [...prev.labels, label]        
            return { ...prev, labels }
        })
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        onSetQueryOptions(localQueryOptions)
        setIsFilterMenuClicked(false)
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
                            <form autoComplete="off" onSubmit={handleSubmit}>
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
                                            >{l.charAt(0).toUpperCase() + l.slice(1)}
                                            </li>
                                        )}
                                    </ul>
                                </div>
                                <div className="toy-filter-mobile-status-selection">
                                    <input
                                        id="status-toggle"
                                        type="checkbox"
                                        name='status'
                                        checked={localQueryOptions.status}
                                        onChange={handleChange}
                                    />
                                    <label className="toy-filter-mobile-status-toggle-switch" htmlFor="status-toggle">
                                        <span className="switch" />
                                        <span className="label">In stock toys only</span>
                                    </label>
                                </div>
                                
                                
                                <div className="toy-filter-mobile-buttons-container">
                                    
                                    <button type='submit' className="submit-filter-btn">
                                        Submit
                                    </button>
                                    <button className="clear-filter-btn" onClick={()=> setLocalQueryOptions(toyService.getDefaultQueryOptions())}>
                                        Clear
                                    </button>
                                    
                                </div>
                            </form>
                            <button 
                                className='hide-filter-btn' 
                                onClick={()=>setIsFilterMenuClicked(false)}
                            >
                                <span className="arrow"><i className="fa fa-chevron-up"></i></span>
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}