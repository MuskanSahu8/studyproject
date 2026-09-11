import React,{useState} from 'react'
import apiClient from '../ApiClient/interceptor'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contextApi/AuthContext';

const Login =() => {
  const navigate=useNavigate();
  const {setUser}=useAuth();
  const [formData,setFormData]=useState({
    email:"",
    password:""
  })
  const [loading,setLoading]=useState(false)
  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }
  const handleSignin =async(e)=>{
    e.preventDefault();
    //fetch
    const {email,password}=formData;
  
  //validation
  if(!email ||! password){
     alert("Email and password are required");
      return;
  }
  try{
    setLoading(true);
    const response =await apiClient.post("/user/login",{
      email,password}
    )
    console.log("signin response",response.data);
    setUser(response.data.user)
    alert("signin succesfully");
    
    navigate("/dashboard")
  }catch(error){
       console.log("Signin error:", error);
  console.log("Status:", error.response?.status);
  console.log("Backend response:", error.response?.data);
  console.log("Errors:", error.response?.data?.errors);

  alert(
    error.response?.data?.errors?.[0]?.msg ||
    error.response?.data?.message ||
    "Login failed"
  );
  }finally{
    setLoading(false)
  }
  }
  return (
      <div className="auth-page">

      <div className="auth-card">

         <div className="auth-header">
        <h1>Welcome Back</h1>
        <p>Sign in to continue to TimeMate</p>
      </div>

      <form onSubmit={handleSignin}>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ?"signin in ...":"sign in"}
        </button>
      </form>
         <p className="auth-switch">
        Don't have an account?{" "}
        <span onClick={() => navigate("/signup")}>
          Sign Up
        </span>
      </p>

    </div>
    </div>
  )
}

export default Login
