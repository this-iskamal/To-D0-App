import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    username: "",
    password: "",
  });
  const handlechange = (e) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value,
    });
  };
  useEffect(()=>{
    if(localStorage.getItem('user'))
    navigate("/todo/home")
  },[navigate])
  const handleclick = async (e) => {
    try {
      e.preventDefault();
      await axios.post("http://192.168.201.47:8000/api/login/", info).then((res) => {
        if (res.data.success) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          toast.success(res.data.message);
          setTimeout(() => {
            navigate("/todo/home");
          }, 2500);
        }
        else
            toast.error(res.data.message)
      });
    } catch (error) {
      toast.error("Error logging in");
    }
  };

  const handleregisterclick = () => {
    navigate("/register");
  };
  const handleloginclick = () => {
    navigate("/login");
  };
  const handleenterclick = (e) =>{
    if(e.key==="Enter")handleclick(e)
  }

  return (
    <Container>
      <ToastContainer />
      <div className="navbar">
        <div className="logo_name">
          <img
            src="https://cdn.shopify.com/shopifycloud/hatchful_web_two/bundles/4a14e7b2de7f6eaf5a6c98cb8c00b8de.png"
            alt=""
          />
          <h1> Login System </h1>
        </div>
        <div className="login_signup">
          <span onClick={handleloginclick}>Login</span>
          <span onClick={handleregisterclick}>Register</span>
        </div>
      </div>
      <div className="inputfields">
        <h1>Login to your account</h1>
        <div className="input_form">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Enter username"
            name="username"
            value={info.username}
            onChange={(e) => handlechange(e)}
            onKeyDown={(e)=>handleenterclick(e)}

          />
        </div>
        <div className="input_form">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            value={info.password}
            onChange={(e) => handlechange(e)}
            onKeyDown={(e)=>handleenterclick(e)}

          />
        </div>
        <button
          onClick={(e) => {
            handleclick(e);
          }}
        >
          Login
        </button>
        <div className="forget_password">
          <p>
            Forgot <a href="/forget-password">Password</a>
          </p>
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #6072d9;
  align-items: center;

  .navbar {
    display: flex;
    flex-direction: row;
    background-color: white;
    width: 100%;
    height: 7%;
    position: absolute;
    top: 0;

    .logo_name {
      display: flex;
      flex-direction: row;
      width: 100%;

      align-items: center;

      img {
        height: 90%;
      }

      h1 {
        font-size: 25px;
      }
    }
    .login_signup {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 1rem;
      margin-right: 3%;
      span {
        font-size: 20px;
        color: black;
        font-weight: 500;
        cursor: pointer;
        &:hover {
          text-decoration: underline;
          color: black;
        }
      }
    }
  }
  .inputfields {
    padding: 2rem 4rem;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1.5rem;
    border-radius: 18px;
    width: 25%;
    h1 {
      font-size: 25px;
    }
    .input_form {
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 0.4rem;
    }
    label {
      font-weight: bold;
    }
    input {
      padding: 0.4rem;
      border-radius: 5px;
      color: black;
      background: transparent;
      border: 1px solid black;
      width: 100%;
      font-size: 18px;
    }
    button {
      padding: 0.5rem;
      font-size: 20px;
      background-color: #4750c9;
      cursor: pointer;
      border: none;
      border-radius: 0.5rem;
      color: white;
      width: 100%;
    }
    .forget_password {
      a {
        text-decoration: none;
      }
    }
  }

  @media only screen and (max-width: 768px) {
    .inputfields {
      width: 100%;
    }
  }
`;
export default Login;
