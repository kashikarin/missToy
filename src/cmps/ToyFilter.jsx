import { useState, useEffect, useRef } from "react"
import { toyService } from "../../services/toy.service"
import { debounce } from "../../services/util.service"
import { ToySort } from "./ToySort"
import { ToyFilterDesktopForm } from "./ToyFilterDesktopForm"
import { ToyFilterMobileForm } from "./ToyFilterMobileForm"
import { useSelector } from "react-redux"


export function ToyFilter({queryOptions, toyLabels, onSetQueryOptions}){
    // const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const formWrapperDivRef = useRef()
    const labelsDropdownRef = useRef()
    // const filterRef = useRef()
    const [isLabelsDropdownOpen, setIsLabelsDropdownOpen] = useState(false)
    const isMobile = useSelector(state => state.systemModule.isMobile)

    useEffect(() => {
        function handleClickOutside(e) {
            if (labelsDropdownRef.current && !labelsDropdownRef.current.contains(e.target)) {
                setIsLabelsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [])


    function onClearFilter(){
        onSetQueryOptions(toyService.getDefaultQueryOptions())
    }    

    return(
        !isMobile ? 
            <ToyFilterDesktopForm 
                queryOptions={queryOptions}
                toyLabels={toyLabels}
                onClearFilter={onClearFilter}
                onSetQueryOptions={onSetQueryOptions}
            /> :
            <ToyFilterMobileForm 
                queryOptions={queryOptions}
                toyLabels={toyLabels}
                onSetQueryOptions={onSetQueryOptions}
                onClearFilter={onClearFilter}
            />
    )    
        
            
        {/* { || isFilterMenuClicked ? (
            <>
                
                        <div className="toyfilter-select-wrapper">
                            <select name="status" id="status" value={queryOptionsToEdit.status} onChange={handleChange}>
                                <option value='all' >All</option>
                                <option value={'inStock'} >In Stock</option>
                                <option value={'notInStock'}>Sold out</option>
                            </select>
                            <span className="arrow"><i className="fa fa-chevron-down"></i></span>
                        </div>
                    </form>
                    <div className="filter-second-row-wrapper">
                        <ToySort queryOptions={queryOptionsToEdit} onSetQueryOptions={onSetQueryOptions}/>
                        <button className='clear-filter-btn' onClick={onClearFilter}>
                            Clear
                        </button>
                    </div>
                    {!isWideScreen && <button className='hide-filter-btn' 
                            onClick={()=>setIsFilterMenuClicked(false)}
                    >
                        <i className="fas fa-chevron-up"></i>
                    </button>} 
                </div>
            </>
        ) : ( */}
}