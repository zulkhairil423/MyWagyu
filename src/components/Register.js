import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "./Firebase";
import { doc, setDoc} from "firebase/firestore";
import Popup from "reactjs-popup";
import "../styles/Popup.css";
import "../styles/Register.css";
import Logo from "../assets/logo.png";
import lottie from "lottie-web";
import { defineElement } from "lord-icon-element";
<script src="https://cdn.lordicon.com/ritcuqlt.js"></script>

// define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation);

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [openPopup, setOpenPopup] = useState(false);
    const { role } = useParams();
    const navigate = useNavigate();

    const signUp = async () => {
        try {
            const userCred = await createUserWithEmailAndPassword(
                auth, email, password,
            );
            const user = userCred.user;
            await setDoc(doc(firestore, "users", user.uid), {
                name: name,
                email: email,
                role: role,
                address: "",
                postcode: "",
                contact: "",
            });
            return true;
        } catch (error) {
            return {error: error.message}
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if(!name || !email || !password || !confirmPassword) {
            alert("Please fill in all field!");
            return;
        }

        if(password !== confirmPassword) {
            alert("Password is not the same!");
            return;
        }

        const res = await signUp();
        if(res.error) {
            alert(res.error);
        } else {
            setOpenPopup(true);
        }
    }

    function handleClose() {
        setOpenPopup(false);
        navigate('/profile');
    }

    return (
        <div className="login-container">
            <Popup
                open={openPopup}
                closeOnDocumentClick
                onClose={handleClose}
                >
                <div className="modal-header">
                    <lord-icon
                        src="https://cdn.lordicon.com/jvihlqtw.json"
                        trigger="loop"
                        colors="primary:#f5f5f5,secondary:#f5f5f5"
                        state="hover-2"
                        delay="1000"
                        class="lord-size-success">
                    </lord-icon>
                </div>
                <div className="modal-container">
                    <div className='modal-error'>
                    <p>You have successfully registered</p>
                    <p>Make sure to fill in your information in profile</p>
                    <p>Please click outside the popup to proceed</p>
                    </div>
                </div>
            </Popup>
            <div className="login-logo register-logo">
                <Link to="/">
                <img src={Logo} alt="logo" />
                </Link>
            </div>
            <div className="box register-box">
                <div className="form">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="inputBox">
                    <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <span>Full Name</span>
                    <i></i>
                    </div>
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
                    <div className="inputBox">
                    <input
                        type="password"
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <span>Confirm Password</span>
                    <i></i>
                    </div>
                    <input type="submit" value="Register" className="c" />
                </form>
                </div>
            </div>
        </div>
    );
}

export default Register;
