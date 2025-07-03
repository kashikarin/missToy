import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { toyService } from "../services/toy.service"
import { utilService } from "../services/util.service"
import { setFilterSort } from "../store/actions/toy.actions"

export function useTruthyFilterSearchParams() { 

    const [searchParams, setSearchParams] = useSearchParams()
    //on mounting - get the query params object and set the initial filterSort object accordingly
    useEffect(() => {
        setFilterSort(toyService.getFilterFromSearchParams(searchParams))
    }, [])
    //update existing filterSort (upgraded setSearchParams method, to set in the url with only truthy params values)
    function setSearchParamsFromTruthyFilter(filterSort) {
        setSearchParams(utilService.getTruthyValues(filterSort))
    }

        
    return setSearchParamsFromTruthyFilter
}

    
