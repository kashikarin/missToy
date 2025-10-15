import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToyIndex } from './pages/ToyIndex'
import { AppHeader } from './cmps/AppHeader'
import { ToyDetails } from './pages/ToyDetails'
import { ToyEdit } from './pages/ToyEdit'
import { Home } from './pages/Home'
import { About } from './pages/About/About'
import { useSelector } from 'react-redux'
import { Vision } from './pages/About/Vision'
import { Team } from './pages/About/Team'
import { ToyFilter } from './cmps/ToyFilter'
import './assets/css/index.scss'

export default function App() {
  const isMobile = useSelector(state => state.systemModule.isMobile)
  return (
        <Router>
            <section className="app main-layout">
                <AppHeader />
                {isMobile && <ToyFilter />}
                <main>
                  <Routes>
                      <Route path='' element={<Home />}/>
                      <Route path='/about' element={<About />}>
                      <Route path='/about/team' element={<Team />}/>
                      <Route path='/about/vision' element={<Vision />}/>
                      </Route>
                      <Route path='/toy' element={<ToyIndex />} />
                      <Route path='/toy/:toyId' element={<ToyDetails />} />
                      <Route path='/toy/edit' element={<ToyEdit />} />
                      <Route path='/toy/edit/:toyId' element={<ToyEdit />} />
                  </Routes>
                </main> 
            </section>
        </Router>    
  )
}

