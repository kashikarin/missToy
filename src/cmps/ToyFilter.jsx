import { useState, useEffect, useRef } from "react"
import { toyService } from "../../services/toy.service"
import { ToyFilterDesktopForm } from "./ToyFilterDesktopForm"
import { ToyFilterMobileForm } from "./ToyFilterMobileForm"
import { useSelector } from "react-redux"


export function ToyFilter({queryOptions, toyLabels, onSetQueryOptions}){
    // const [screenWidth, setScreenWidth] = useState(window.innerWidth);
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
}