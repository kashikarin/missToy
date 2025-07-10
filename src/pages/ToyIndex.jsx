import { Link } from "react-router";
import { ToyList } from "../cmps/ToyList";
import { ToyFilter } from "../cmps/ToyFilter";
import { useSelector } from "react-redux";
import { toyService } from "../../services/toy.service";
import { useEffect, useState } from "react";
import { useTruthyFilterSearchParams } from "../../customHooks/useTruthyFilterSearchParams";
import { loadToys, setQueryOptions, removeToy } from "../../store/actions/toy.actions";


export function ToyIndex(){

  const queryOptions = useSelector(state => state.toyModule.queryOptions)
  const toys = useSelector(state => state.toyModule.toys)
  const [existingLabels, setExistingLabels] = useState([])
  
  useEffect(()=>{
    (async function getExistingToyLabels(queryOptions){
      const labels = await toyService.getExistingLabels(queryOptions)
      setExistingLabels(labels)
    })()
  }, [toys])  

  const setSearchParamsFromTruthyFilter = useTruthyFilterSearchParams()

  useEffect(()=>{
    onUpdateFilter()
  }, [queryOptions])

  function onSetQueryOptions(queryOptionsObj) {
    setQueryOptions(queryOptionsObj)
  }

  async function onUpdateFilter(){
      await loadToys()
      setSearchParamsFromTruthyFilter(queryOptions)
    }
  async function onRemoveToy(toyId) {
      await removeToy(toyId)
  }
  return(
      <section className="toy-index-container">
        <ToyFilter queryOptions={queryOptions} onSetQueryOptions={onSetQueryOptions} existingLabels={existingLabels}/>
        <Link to='/toy/edit'><button>Add Toy</button></Link>
        <ToyList toys={toys} onRemoveToy={onRemoveToy} />
      </section>
      
    )
}

