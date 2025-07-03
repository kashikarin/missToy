// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './assets/css/index.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { ToyIndex } from './pages/ToyIndex'
import { AppHeader } from './cmps/AppHeader'
import { ToyDetails } from './pages/ToyDetails'
import { ToyEdit } from './pages/ToyEdit'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { store } from '../store/store'
import { Provider } from 'react-redux'



export default function App() {

  return (
    <Provider store={store}>
        <Router>
            <section className="app">
              <AppHeader />
              <main className="main-layout">
                <Routes>
                  <Route path='' element={<Home />}/>
                  <Route path='/about' element={<About />} />
                  <Route path='/toy' element={<ToyIndex />} />
                  <Route path='/toy/:todId' element={<ToyDetails />} />
                  <Route path='/toy/edit' element={<ToyEdit />} />
                  <Route path='/toy/edit/:toyId' element={<ToyEdit />} />
                </Routes>
              </main> 
            </section>
          </Router>
    </Provider>
    
  )
}

