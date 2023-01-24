import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import "../styles/Popup.css";
import "../styles/Login.css";
import Logo from "../assets/logo.png";
import { auth } from "./Firebase";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import lottie from "lottie-web";
import { defineElement } from "lord-icon-element";
<script src="https://cdn.lordicon.com/ritcuqlt.js"></script>

// define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation);

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openPopup, setOpenPopup] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigate("/profile");
      })
      .catch((error) => {
        alert(error.code + ": " + error.message);
      })

  }

  function resetPassword() {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setResetSuccess(true);
      })
      .catch((error) => {
        alert(error.code + ": " + error.message);
      });
  }

  function handleClose() {
    setOpenPopup(false);
  }

  return (
    <div className="login-container">
      {resetSuccess ? (
        <Popup
            open={openPopup}
            closeOnDocumentClick
            onClose={handleClose}
            >
            <div className="modal-header">
              <lord-icon
                  src="https://cdn.lordicon.com/rhvddzym.json"
                  trigger="hover"
                  colors="primary:#f5f5f5,secondary:#08a88a"
                  class="lord-size-success">
              </lord-icon>
            </div>
            <div className="modal-container">
                <div className='modal-error'>
                  <div className="modal-rst-psswrd">
                    <p>Email reset password has been sent.</p>
                    <p>Please check your email.</p>
                  </div>
                </div>
            </div>
        </Popup>
      ) : (
        <Popup
            open={openPopup}
            closeOnDocumentClick
            onClose={handleClose}
            >
            <div className="modal-header">
              <lord-icon
                  src="https://cdn.lordicon.com/tkgyrmwc.json"
                  trigger="hover"
                  colors="primary:#f5f5f5,secondary:#08a88a"
                  class="lord-size-success">
              </lord-icon>
            </div>
            <div className="modal-container">
                <div className='modal-error'>
                  <div className="modal-rst-psswrd">
                    <p>Please enter your email</p>
                    <input
                            placeholder="Enter email"
                            name="email"
                            value={email}
                            className="input"
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
                            />
                    <div className="modal-rst-psswrd-btn">
                      <button className="btn-forgot-pass" onClick={resetPassword}>
                        <div class="svg-wrapper-1">
                          <div class="svg-wrapper">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                              <path fill="none" d="M0 0h24v24H0z"></path>
                              <path fill="currentColor" d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
                            </svg>
                          </div>
                        </div>
                        <span>Reset Password</span>
                      </button>
                    </div>
                  </div>
                </div>
            </div>
        </Popup>
      )}
      <div className="login-logo">
          <Link to="/">
            <img src={Logo} alt="logo" />
          </Link>
      </div>
      <div className="box">
        <div className="form">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="inputBox">
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span>Email</span>
              <i></i>
            </div>
            <div className="inputBox">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span>Password</span>
              <i></i>
            </div>
            <div className="links">
              <br />
              <br />
              <a onClick={() => setOpenPopup(true)}>Forgot Password?</a>
              <div>
                <Link to={'/register/customer'}>Sign Up</Link>
              </div>
            </div>

            <input type="submit" value="Login" className="c" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
