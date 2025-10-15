import { useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { toyService } from "../services/toy.service"
import { getTruthyValues } from "../services/util.service"
import { setQueryOptions } from "../store/actions/toy.actions"

export function useTruthyFilterSearchParams() { 

    const [searchParams, setSearchParams] = useSearchParams()
    //on mounting - get the query params object and set the initial queryOptions object accordingly
    useEffect(() => {
        setQueryOptions(toyService.getQueryOptionsFromSearchParams(searchParams))
    }, [])
    //update existing queryOptions (upgraded setSearchParams method, to set in the url with only truthy params values)
    function setSearchParamsFromTruthyFilter(queryOptions) {
        setSearchParams(getTruthyValues(queryOptions))
    }

        
    return setSearchParamsFromTruthyFilter
}

    
