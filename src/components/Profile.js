import { useState, useCallback, useEffect } from "react";
import "../styles/Profile.css";
import NavBar from "./NavBar";
import { useAuth } from "./AuthContext";
import { firestore } from "./Firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import lottie from "lottie-web";
import { defineElement } from "lord-icon-element";
<script src="https://cdn.lordicon.com/ritcuqlt.js"></script>

// define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation);

const Profile = () => {
    const {user} = useAuth();
    const [editing, setEditing] = useState(false);
    const [updating, setUpdating] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [postcode, setPostcode] = useState("");
    const [contact, setContact] = useState("");

    const getUserInfo = async () => {
        const userDoc= await getDoc(doc(firestore, "users", user.uid));
        return(userDoc.data());
    }

    useEffect(() => {
        getUserInfo().then((data) => {
            setName(data.name);
            setEmail(data.email);
            setAddress(data.address);
            setPostcode(data.postcode);
            setContact(data.contact);
        });
        console.log("heh");
    },[])

    const handleEdit = async () => {
        if(editing) {
            try {
                await updateDoc(doc(firestore, "users", user.uid), {
                    name: name,
                    email: email,
                    address: address,
                    postcode: postcode,
                    contact: contact
                });
            } catch (e) {
                console.error(e);
            }
        }
        setEditing(!editing);
    }
    

    const handleChange = e => {
        if (e.target.name === "address") {
            setAddress(e.target.value);
        } else if (e.target.name === "postcode") {
            setPostcode(e.target.value);
        } else if (e.target.name === "contact") {
            setContact(e.target.value);
        }
    };

    return (
        <div className="navbar-container profile-header">
        <NavBar />
        <div className="profile-container">
            <div className="profile-header">
                <h2>Profile</h2>
            </div>
            <br></br>
            <div className="profile-detail">
                <div className="detail-row">
                    <p className="detail-label">Full Name</p>
                    <p className="detail-colon">:</p>
                    <p className="detail-value">{name}</p>
                </div>
                <div className="detail-row">
                    <p className="detail-label">Email</p>
                    <p className="detail-colon">:</p>
                    <p className="detail-value">{email}</p>
                </div>
                <div className="detail-row pad-top">
                    <p className="detail-label">Address</p>
                    <p className="detail-colon">:</p>
                    {editing ? (
                        <textarea
                            className="detail-value"
                            type="text"
                            name="address"
                            value={address}
                            onChange={handleChange}
                            rows="4"
                            cols="50"
                        />
                    ) : (
                        <p className="detail-value">{address}</p>
                    )}
                </div>
                <div className="detail-row">
                    <p className="detail-label">Postcode</p>
                    <p className="detail-colon">:</p>
                    {editing ? (
                        <input
                            className="detail-value"
                            type="text"
                            name="postcode"
                            value={postcode}
                            onChange={handleChange}
                        />
                    ) : (
                        <p className="detail-value">{postcode}</p>
                    )}
                </div>
                <div className="detail-row">
                    <p className="detail-label">Contact No</p>
                    <p className="detail-colon">:</p>
                    {editing ? (
                        <input
                            className="detail-value"
                            type="text"
                            name="contact"
                            value={contact}
                            onChange={handleChange}
                        />
                    ) : (
                        <p className="detail-value">{contact}</p>
                    )}
                </div>
                <div className="detail-row">
                    <div onClick={handleEdit} className="profile-edit">
                        <p>{editing ? "Save" : "Edit"}</p>
                        <lord-icon
                            src="https://cdn.lordicon.com/wloilxuq.json"
                            trigger="hover"
                            colors="primary:#d3d3d3,secondary:#f5f5f5"
                            state="hover-2"
                            class="lord-size"
                            >
                        </lord-icon>
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Profile;
