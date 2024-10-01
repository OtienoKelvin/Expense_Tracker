import { useContext, useState } from "react"
import "./Login.scss"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../Context/authContext";

const Login = () => {

  const navigate = useNavigate();
  const {login, error, setError} = useContext(AuthContext);
  const [inputs, setinputs] = useState({
    username: "",
    email: "",
    password: ""
  })

  const [errors, seterrors] = useState({})
  const validateInputs = () => {
    const newErrors ={}
    if(!inputs.username) newErrors.username = "Username is required";
    if(!inputs.email ) newErrors.email = "A valid email is required";
    if(!inputs.password ) newErrors.password = "Password is required";
    return newErrors;
  }

  const handleChange = (e) => {
    const {id, value} = e.target
    seterrors(prev => ({
      ...prev, [id]: ""
    }))
    setError("")
    setinputs(prev => ({
      ...prev, [id]: value
    }))
  }


  console.log(error)  

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validateInputs();
    if(Object.keys(validationErrors).length > 0) {
      seterrors(validationErrors)
      return;
    }

    try {
      const response = await login(inputs);
      console.log(response)

      if(response === 200) {
        console.log("Login successful")
        navigate("/", {replace: true})
      }

    } catch (error) {
      console.log(error)
    }


  }


  return (
    <div className="login">
      <div className="info-content">
        <div className="logo">
          <img src="" alt="" />
          <span>Expense Tracker</span>
        </div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus optio itaque sunt laboriosam laborum nostrum? Nostrum, harum ipsum nemo corrupti molestiae excepturi debitis atque esse ullam soluta fuga iusto vel.</p>
        <button onClick={() => navigate("/register")}>Get Started</button>
      </div> 
      <form onSubmit={handleSubmit}>
        <div className="form-header">
          <h1>Login</h1>
        </div>
        {error && <span className="error">{error}</span>}
        <div className="form-controls">
          {[ "username", "email", "password"].map(field => (
            <div className="input-field" key={field}>
              <label htmlFor={field}>
                {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")}
              </label>
              <input
                type={field === "password" ? "password" : "text"}
                name={field}
                id={field}
                onChange={handleChange}
                style={{borderColor: errors[field] ? "red" : ""}}
              />
              {errors[field] && <span className="error">{errors[field]}</span>} 
            </div>
          ))}
          <button type="submit">
            Login
          </button>
        </div>
      </form>   
    </div>
  )
}

export default Login
