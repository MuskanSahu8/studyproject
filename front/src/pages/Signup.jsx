
import React,{useState} from 'react'
import apiClient from '../ApiClient/interceptor';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate=useNavigate();
  const [formData,setFormData]=useState({
    name:"",
    email:"",
    password:""
  })
  const [loading,setLoading]=useState(false);
  const handleChange=(e)=>{
    setFormData({
      ...formData,
      [e.target.name]:e.target.value
    })
  }
  const handleSignup =async(e)=>{
    e.preventDefault();
    
      // fetch
      const {name,email,password}=formData;
      // validate
      if(!name ||!email ||!password){
        alert("all fields are req");
        //return is used so that function can stop
        return;
      };
      try{
        setLoading(true);
      const response= await apiClient.post("/user/signup",{
        name,email,password
      })
      console.log(response.data.data);
      alert("sign up successfully")
      navigate("/dashboard");

    }catch(error){
       console.log("Signup error:", error);

  console.log("Status:", error.response?.status);
  console.log("Backend response:", error.response?.data);

  alert(
    error.response?.data?.message ||
    "Signup failed"
  );
  alert(
    error.response?.data?.errors?.[0]?.message ||
    "Signup failed"
  );
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className='auth-page'>
      <div className='auth-card'>
        
          <div className="auth-header">
        <h1>Create Account</h1>
        <p>Start managing your time with TimeMate</p>
      </div>

       <form onSubmit={handleSignup}>
          <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

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

        <button type='submit' disabled={loading}>
          {loading ? "Creating Account..." : 'create Account'}
        </button>
       </form>
         <p className='auth-switch'>
          Already have an account?{" "}
          <span
            className="auth-link"
            onClick={() => navigate("/login")}
          >
            Sign In
          </span>
        </p>
      </div>
    </div>
  )
}

export default Signup
