import './App.css'
import { NavLink, Route, Routes } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import CityDetailsPage from './pages/CityDetailsPage'
import AboutPage from './pages/AboutPage'

function App() {
  return (
    <div className="app">
      <header>
        <nav>
          <NavLink to="/" end>
            Cities
          </NavLink>

          <NavLink to="/about">
            About
          </NavLink>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<DashboardPage />} />

          <Route path="/city/:name" element={<CityDetailsPage />} />

          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
