import { useState } from "react"
import "./Register.scss"
import makeRequest from "../../axios"
import { useNavigate } from "react-router-dom"

const Register = () => {

  const navigate = useNavigate();
  const [inputs, setinputs] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: ""
  })

  const [errors, seterrors] = useState({})

  const handleChange = (e) =>  {
    const {id, value} = e.target
    seterrors(prev => ({
      ...prev, [id]: ""
    }))
    setinputs(prev => ({
      ...prev, [id]: value
    }))
  }

  const validateInputs = () => {
    const newErrors ={}
    const validEmail = /\S+@\S+\.\S+/;
    const validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/
    if(!inputs.firstName) newErrors.firstName = "First Name is required";
    if(!inputs.lastName) newErrors.lastName = "Last Name is required";
    if(!inputs.username) newErrors.username = "Username is required";
    if(!inputs.email || !validEmail.test(inputs.email)) newErrors.email = "A valid email is required";
    if(!inputs.password || !validPassword.test(inputs.password)) newErrors.password = "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number";
    return newErrors;
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    const validationErrors = validateInputs();
    if(Object.keys(validationErrors).length > 0) {
      seterrors(validationErrors)
      return;
    }

    try {
      const response = await makeRequest.post("/auth/register", inputs)
      if(response.status === 201) {
        console.log("Account created successfully")
        navigate("/login", {replace: true})
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="register">
      <div className="info-content">
        <div className="logo">
          <img src="" alt="" />
          <span>Expense Tracker</span>
        </div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus optio itaque sunt laboriosam laborum nostrum? Nostrum, harum ipsum nemo corrupti molestiae excepturi debitis atque esse ullam soluta fuga iusto vel.</p>
      </div> 
      <form onSubmit={handleSubmit}>
        <div className="form-header">
          <h1>Sign Up</h1>
        </div>
        <div className="form-controls">
          {["firstName", "lastName", "username", "email", "password"].map(field => (
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
            Register
          </button>
        </div>
      </form>    
    </div>
  )
}

export default Register
