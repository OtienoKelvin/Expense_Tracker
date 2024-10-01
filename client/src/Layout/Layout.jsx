import Navbar from "../components/NavComponents/navbar/Navbar"
import Sidebar from "../components/NavComponents/sidebar/Sidebar"
import "./Layout.scss"
import { Outlet } from "react-router-dom"

const Layout = () => {
  return (
    <div className="layout">
      <div className="top-nav">
        <Navbar />
      </div>    
      <div className="container">
        <div className="sidebar-container">
            <Sidebar/>
        </div>
        <div className="main-content">
            <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default Layout
