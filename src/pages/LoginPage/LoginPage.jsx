import React, { useContext, useState } from "react";
import "./LoginPage.css";
import close_button from "../../assests/cross_icon.png";
import { StoreContext } from "../../context/StoreContext";

const LoginPage = ({ setShowLogin }) => {
  const { setToken, url, loadCartData, userRole, setUserRole } = useContext(StoreContext);
  const [currState, setCurrState] = useState("Sign Up");

  const [data, setData] = useState({
    user_name: "",
    user_id: "",
    user_password: "",
    user_role : "user"
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    let new_url = url;

    if (currState === "Sign Up") {
      console.log(data);
      const response = await fetch(`${url}users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setData({
        user_name: "",
        user_id: "",
        user_password: "",
        user_role : "user"
      });
    }
    if(currState === "Login"){
        const users = await fetch(`${url}users`).then((res) => res.json()).then((data) => data);
        users.map((user) => {
            if(data.user_id === user.user_id && data.user_password === user.user_password){
              if(user.user_role === "admin"){
                alert("User Role - Admin ");
                setToken(true);
                setUserRole(true);
                setShowLogin(false)
                return;
              }else{
                alert("User Role - Customer");
                setToken(true);
                setUserRole(false);
                setShowLogin(false)
                return;

              }
            }
          
        })
    }


    if (currState === "Login") {
      new_url += "/api/user/login";
    } else {
      new_url += "/api/user/register";
    }


    // const response = await axios.post(new_url, data);
    // if (response.data.success) {
    //     setToken(response.data.token)
    //     localStorage.setItem("token", response.data.token)
    //     loadCartData({token:response.data.token})
    //     setShowLogin(false)
    // }
    // else {
    //     toast.error(response.data.message)
    // }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>{" "}
          <img onClick={() => setShowLogin(false)} src={close_button} alt="" />
        </div>
        <div className="login-popup-inputs">
          {currState === "Sign Up" ? (
            <input
              name="user_name"
              onChange={onChangeHandler}
              value={data.user_name}
              type="text"
              placeholder="Full Name"
              required
            />
          ) : (
            <></>
          )}
          <input
            name="user_id"
            onChange={onChangeHandler}
            value={data.user_id}
            type="text"
            placeholder="User ID"
          />
          <input
            name="user_password"
            onChange={onChangeHandler}
            value={data.user_password}
            type="password"
            placeholder="User Password"
            required
          />
        </div>
        <button>{currState === "Login" ? "Login" : "Create account"}</button>
       
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
