import { useState, useEffect, useRef } from "react"
import { toyService } from "../../services/toy.service"
import { utilService } from "../../services/util.service"
import { ToySort } from "./ToySort"
import Select from 'react-select'
import { useEffectUpdate } from "../../customHooks/useEffectUpdate"


export function ToyFilter({filterSort, onSetFilterSort, existingLabels}){
    const [filterSortToEdit, setFilterSortToEdit] = useState(filterSort)
    const [selectedOptions, setSelectedOptions] = useState([])
    const debouncedOnSetFilterRef = useRef(utilService.debounce(onSetFilterSort)).current
    
    //update the labels' field in the filter
    useEffect(()=>{
        let labels = []
        let selectedLabels = selectedOptions.map(selectedOption => labels.push(selectedOption.value))
        if (isSelectedLabelsUpdated(selectedLabels)) return
        setFilterSortToEdit(prevFilter => ({...prevFilter, labels}))
    }, [selectedOptions])
    
    //have labels changed versus the filter
    function isSelectedLabelsUpdated(newSeletedOptions) {
        if (newSeletedOptions?.length !== filterSortToEdit.labels.length) return false
        let ans = newSeletedOptions.every(option => filterSortToEdit.labels.includes(option))
        return ans
    } 

    useEffectUpdate(()=>{
        debouncedOnSetFilterRef(filterSortToEdit)       
    }, [filterSortToEdit])

    function handleChange({target}) {
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

            default: break
        }

        setFilterSortToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function getMultipleSelectOptions(optionsArr) {
        return optionsArr.map(optionItem => ({value: optionItem, label: optionItem}))
    }

    function onClearFilter(){
        setFilterSortToEdit(toyService.getDefaultFilter())
    }

    const {name} = filterSortToEdit
    return(
        <section className="toy-filter-container">
            <form autoComplete="off">
                <input type="text" name='name' placeholder='Toy Name' value={name} onChange={handleChange}/>
                <Select classNamePrefix="labels-select" isMulti options={getMultipleSelectOptions(existingLabels)} value={selectedOptions} placeholder='Type a label' name="labels" onChange={setSelectedOptions} >
                </Select>
                <div className="toyfilter-select-wrapper">
                    <select name="status" id="status" onChange={handleChange}>
                        <option defaultChecked>All</option>
                        <option value={true}>In Stock</option>
                        <option value={false}>Soldout</option>
                    </select>
                    <span className="arrow"><i className="fa fa-chevron-down"></i></span>
                </div>
                <button onClick={onClearFilter}>Clear</button>
            </form>
            <ToySort onSetFilterSort={onSetFilterSort}/>
        </section>
    )
}