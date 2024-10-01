import { Link, useLocation } from "react-router-dom";
import "./Sidebar.scss";
import menuData from "./sidebardata";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import CategoryIcon from '@mui/icons-material/Category';
import PaymentsIcon from '@mui/icons-material/Payments';
import PaidIcon from '@mui/icons-material/Paid';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const icons = {
  dashboard: <DashboardIcon />,
  analytics: <AnalyticsIcon />,
  expense: <AccountBalanceWalletIcon />,
  category: <CategoryIcon />,
  payment: <PaymentsIcon />,
  budget: <PaidIcon />,
}

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="nav-links">
        {menuData.map((item) => (
          <Link to={item.route} key={item.id} className={`link ${location.pathname === item.route ? "active" : ""}`}>
            <div className="nav-link">
              {icons[item.icon]}
              <span>{item.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Sidebar
