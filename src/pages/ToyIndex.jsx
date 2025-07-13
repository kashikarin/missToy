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
  const [toyLabels, setToyLabels] = useState([])

  const setSearchParamsFromTruthyFilter = useTruthyFilterSearchParams()

  useEffect(()=>{
    onUpdateFilter()
    setSearchParamsFromTruthyFilter(queryOptions)
  }, [queryOptions])

  function onSetQueryOptions(queryOptionsObj) {
    setQueryOptions(queryOptionsObj)
  }

  async function onUpdateFilter(){
      let [ ,labels] = await Promise.all([loadToys(), getToyLabels()])
      let labelsArr = labels.map(label => ({label, value: label }))
      setToyLabels(labelsArr)
    }

  async function onRemoveToy(toyId) {
      await removeToy(toyId)
  }

  async function getToyLabels(){
    const labels = await toyService.getToyLabels()
    return Promise.resolve(labels)
    
  }

  if (isLoading) return <img src={Loader} alt='Loading...' />

  return(
      <section className="toy-index-container">
        <ToyFilter queryOptions={queryOptions} toyLabels={toyLabels} onSetQueryOptions={onSetQueryOptions} />
        <Link to='/toy/edit'><button>Add Toy</button></Link>
        {toys.length === 0? <span style={{fontSize: '20px', marginBlockStart: '15px'}}>No toys to show</span> : <ToyList toys={toys} onRemoveToy={onRemoveToy} />}
      </section>
      
    )
}

