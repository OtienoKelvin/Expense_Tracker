import "./Navbar.scss"
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="logo">Logo</div>
      <div className="wrapper">
        <div className="notification">
          <CircleNotificationsIcon style={{height: "30px", width: "30px"}}/>
          <span></span>
        </div>
        <div className="user">
          <img src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" />
          <span>John Doe</span>
        </div>
      </div>
    </div>
  )
}

export default Navbar
