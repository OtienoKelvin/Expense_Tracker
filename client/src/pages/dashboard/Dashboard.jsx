import "./dashboard.scss"
import TopDash from "../../components/Topdashboard/TopDash"
import BudgetChart from "../../components/Charts/BudgetChart"
import Calendar from "../../components/calendar/Calendar"
import CategoryBarChart from "../../components/Charts/ExpenseByCategory/CategoryBarChart"

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="box-1 card"><TopDash /></div>
      <div className="box-2 card">
        <span>Budget Allocation</span>
        <BudgetChart/>
      </div>
      <div className="box-3 card"><Calendar/></div>
      <div className="box-4 card">
        <span>Expense By Category</span>
        <CategoryBarChart/>
      </div>
      <div className="box-5 card">Box5</div>
    </div>
  )
}

export default Dashboard
