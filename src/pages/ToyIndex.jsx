import { Link } from "react-router";
import { ToyList } from "../cmps/ToyList";
import { ToyFilter } from "../cmps/ToyFilter";
import { useSelector } from "react-redux";
import { toyService } from "../../services/toy.service";
import { useEffect, useState, ReactComponent } from "react";
import { useTruthyFilterSearchParams } from "../../customHooks/useTruthyFilterSearchParams";
import { loadToys, setFilterSort, removeToy } from "../../store/actions/toy.actions";


export function ToyIndex(){

  const filterSort = useSelector(state => state.toyModule.filterSort)
  const toys = useSelector(state => state.toyModule.toys)
  const [existingLabels, setExistingLabels] = useState([])
  
  useEffect(()=>{
    (async function getExistingToyLabels(filterSort){
      const labels = await toyService.getExistingLabels(filterSort)
      setExistingLabels(labels)
    })()
  }, [toys])  

  const setSearchParamsFromTruthyFilter = useTruthyFilterSearchParams()

  useEffect(()=>{
    (async function onUpdateFilter(){
      await loadToys()
      setSearchParamsFromTruthyFilter(filterSort)
    })()
  }, [filterSort])

  function onSetFilterSort(filterSortObj) {
      setFilterSort(filterSortObj)
  }

  async function onRemoveToy(toyId) {
      await removeToy(toyId)
  }
  return(
      <section className="toy-index-container">
        <ToyFilter filterSort={filterSort} onSetFilterSort={onSetFilterSort} existingLabels={existingLabels}/>
        <Link to='/toy/edit'><button>Add Toy</button></Link>
        <ToyList toys={toys} onRemoveToy={onRemoveToy} />
      </section>
      
    )
}

