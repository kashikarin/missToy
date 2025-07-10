// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './assets/css/index.scss'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToyIndex } from './pages/ToyIndex'
import { AppHeader } from './cmps/AppHeader'
import { ToyDetails } from './pages/ToyDetails'
import { ToyEdit } from './pages/ToyEdit'
import { Home } from './pages/Home'
import { About } from './pages/About/About'
import { store } from '../store/store'
import { Provider } from 'react-redux'
import { Vision } from './pages/About/Vision'
import { Team } from './pages/About/Team'

export default function App() {

  return (
    <Provider store={store}>
        <Router>
            <section className="app main-layout">
              <AppHeader />
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
    </Provider>
    
  )
}

