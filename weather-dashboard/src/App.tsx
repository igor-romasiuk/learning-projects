import './App.css'
import { NavLink, Route, Routes } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import CityDetailsPage from './pages/CityDetailsPage'
import AboutPage from './pages/AboutPage'
import styles from './AppHeader.module.css'

function App() {
  return (
    <div className="app">
      <header className={styles.header}>
        <span className={styles.brand}>Weather Dashboard</span>

        <nav className={styles.nav}>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`.trim()
            }
          >
            Cities
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`.trim()
            }
          >
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
