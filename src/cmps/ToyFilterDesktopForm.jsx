import { useRef, useState } from "react"
import { useEffectUpdate } from "../../customHooks/useEffectUpdate"

export function ToyFilterDesktopForm({
                    queryOptions, 
                    toyLabels, 
                    onClearFilter,
                    onSetQueryOptions
                }){
                    const [name, setName] = useState(queryOptions.name || "")
                    const formWrapperDivRef = useRef()
                    const labelsDropdownRef = useRef()
                    const [isLabelsDropdownOpen, setIsLabelsDropdownOpen] = useState(false)

                    useEffectUpdate(()=>{
                        onSetQueryOptions( {name} )
                    }, [name])

                    function handleChange({target}) {   
                        const field = target.name
                        let value = target.value
                        // if (target.className === 'labels-selection') 
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
                        onSetQueryOptions({ [field]: value, [`${field}Changed`]: true })
                    }

                    
                    function getLabelsTags(labelsArr) {
                        if (!labelsArr || !Array.isArray(labelsArr) || !labelsArr?.length) return 'Select one or more labels'
                        return (
                            labelsArr.map(label => (
                                <span key={label} className="toy-filter-label-tag">
                                    {label}
                                    <button 
                                        className="toy-filter-label-remove-tag"
                                        onClick={(e)=> {
                                            e.stopPropagation()
                                            toggleLabel(label)
                                        }}
                                    >
                                        x
                                    </button>
                                </span>     
                            ))
                        )
                    }

                    function toggleLabel(label) {
                        label = label.toLowerCase()
                        const labels = queryOptions.labels.includes(label)?
                                queryOptions.labels.filter(l => l !== label)
                            : [...queryOptions.labels, label]
                        onSetQueryOptions({ labels })
                    }

                    return(
                        <div className="toy-filter-desktop-container">
                            <h2>Your perfect toy starts here</h2>
                            <form autoComplete="off" onSubmit={(ev) => ev.preventDefault()}>
                                {/* name input filter */}
                                <input 
                                    type="text" 
                                    className='toy-filter-desktop-name-input'
                                    name='name' 
                                    onChange={({target})=>setName(target.value)}
                                    placeholder='Toy name' 
                                    value={name}
                                />
                                {/* labels filter */}
                                <div className="toy-filter-desktop-labels-selection" ref={labelsDropdownRef}>
                                    <div 
                                        className="labels-trigger" 
                                        onClick={() => setIsLabelsDropdownOpen(prev => !prev)}
                                    >
                                        <div className="selected-tags">
                                            {getLabelsTags(queryOptions.labels)}
                                        </div>
                                        <span>{isLabelsDropdownOpen ? "▲" : "▼"}</span>
                                    </div>
                                    {isLabelsDropdownOpen && (
                                        <div className="labels-dropdown-container">
                                            {toyLabels.map(label => (
                                                                        <>
                                                                            <label>
                                                                            <input 
                                                                                    key={label}
                                                                                    id={label} 
                                                                                    type='checkbox' 
                                                                                    onChange={()=> toggleLabel(label)}
                                                                                    checked={queryOptions.labels.includes(label)}
                                                                                /> 
                                                                                {label.charAt(0).toUpperCase() + label.slice(1).toLowerCase()}
                                                                            </label>    
                                                                        </>
                                                                    )
                                                                    
                                                            )
                                            }
                                        </div>
                                        
                                    )}
                                </div>
                                {/* stock status filter input */}
                                <label htmlFor="toyStatus" className='toy-filter-desktop-status-checkbox'>
                                    <input 
                                        id='toyStatus' 
                                        name='status'
                                        type="checkbox" 
                                        checked={queryOptions.status}
                                        onChange={handleChange} 
                                    />
                                    In stock toys only
                                </label>
                            </form>
                            <button className='clear-filter-btn' onClick={onClearFilter}>
                                Clear filter
                            </button>
                        </div>
                    )
                }


