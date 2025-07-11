import { Link } from "react-router";
import { ToyList } from "../cmps/ToyList";
import { ToyFilter } from "../cmps/ToyFilter";
import { useSelector } from "react-redux";
import { toyService } from "../../services/toy.service";
import { useEffect, useState } from "react";
import { useTruthyFilterSearchParams } from "../../customHooks/useTruthyFilterSearchParams";
import { loadToys, setQueryOptions, removeToy } from "../../store/actions/toy.actions";
import Loader from '../assets/images/Loader.svg'

export function ToyIndex(){

  const queryOptions = useSelector(state => state.toyModule.queryOptions)
  const toys = useSelector(state => state.toyModule.toys)
  const isLoading = useSelector(state => state.systemModule.isLoading)

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
  if (isLoading) return <img src={Loader} alt='Loading...' />

  return(
      <section className="toy-index-container">
        <ToyFilter queryOptions={queryOptions} onSetQueryOptions={onSetQueryOptions} />
        <Link to='/toy/edit'><button>Add Toy</button></Link>
        {toys.length === 0? <span style={{fontSize: '20px', marginBlockStart: '15px'}}>No toys to show</span> : <ToyList toys={toys} onRemoveToy={onRemoveToy} />}
      </section>
      
    )
}

