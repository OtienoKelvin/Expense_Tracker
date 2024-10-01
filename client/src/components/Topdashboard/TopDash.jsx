import "./topDash.scss";

const TopDash = () => {
  return (
    <div className="top-dash">
      <div className="greet">
        <span className="greeting">Good Morning,</span>
      </div>
      <div className="top-cards">
            <div className="card">
                <span>Total Expense</span>
                <div className="balance-info">
                    <span className="expense">$2,300</span>
                    <div className="percentage-increase">
                        <span className="percentage">+10%</span>
                        <span className="text">Since last month</span>
                    </div>
                </div>
            </div>
            <div className="card">
                <span>Total Income</span>
                <div className="balance-info">
                    <span className="expense">$2,300</span>
                    <div className="percentage-decrease">
                        <span className="percentage">-10%</span>
                        <span className="text">Since last month</span>
                    </div>
                </div>
            </div>
            <div className="card">
                <span>Total Budget</span>
                <div className="balance-info">
                    <span className="expense">$2,300</span>
                    <div className="percentage-increase">
                        <span className="percentage">+10%</span>
                        <span className="text">Since last month</span>
                    </div>
                </div>
            </div>
            <div className="card">
                <span>Total Savings</span>
                <div className="balance-info">
                    <span className="expense">$2,300</span>
                    <div className="percentage-decrease">
                        <span className="percentage">-10%</span>
                        <span className="text">Since last month</span>
                    </div>
                </div>
            </div>
      </div>
    </div>
  )
}

export default TopDash
