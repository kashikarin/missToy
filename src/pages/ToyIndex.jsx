import { Link } from "react-router";
import { ToyList } from "../cmps/ToyList";
import { ToyFilter } from "../cmps/ToyFilter";
import { useSelector } from "react-redux";
import { toyService } from "../../services/toy.service";
import { useEffect, useRef, useState } from "react";
import { useTruthyFilterSearchParams } from "../../customHooks/useTruthyFilterSearchParams";
import { loadToys, setQueryOptions, removeToy } from "../../store/actions/toy.actions";
import { ToyLoader } from "../cmps/ToyLoader";
import { debounce } from "../../services/util.service";

export function ToyIndex(){
  const queryOptions = useSelector(state => state.toyModule.queryOptions)
  const toys = useSelector(state => state.toyModule.toys)
  const isLoading = useSelector(state => state.systemModule.isLoading)
  const [toyLabels, setToyLabels] = useState([])
  const isMobile = useSelector(state => state.systemModule.isMobile)
  const setSearchParamsFromTruthyFilter = useTruthyFilterSearchParams()
  const debouncedSetQueryOptions = useRef(debounce(setQueryOptions, 700)).current
  useEffect(()=>{
    loadToyLabels()
    setSearchParamsFromTruthyFilter(queryOptions)
    loadToys(queryOptions)
  }, [queryOptions])

  function onSetQueryOptions(queryOptionsObj) {  
    if ('name' in queryOptionsObj) {
      debouncedSetQueryOptions(queryOptionsObj)
    } else {
      setQueryOptions(queryOptionsObj)
    }
  }

  async function loadToyLabels(){
      const labels = await toyService.getToyLabels()
      setToyLabels(labels)
  }

  async function onRemoveToy(toyId) {
      await removeToy(toyId)
  }

  if (isLoading) return <ToyLoader />

  return(
      <section className={`toy-index-container ${isMobile ? "mobile-index-layout" : ""}`}>
        <ToyFilter queryOptions={queryOptions} toyLabels={toyLabels} onSetQueryOptions={onSetQueryOptions} />
        <Link to='/toy/edit'><button>Add Toy</button></Link>
        {toys.length === 0? <span style={{fontSize: '20px', marginBlockStart: '15px'}}>No toys to show</span> : <ToyList toys={toys} onRemoveToy={onRemoveToy} />}
      </section>
    )
}

