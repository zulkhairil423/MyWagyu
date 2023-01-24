import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Popup from 'reactjs-popup';
import "../styles/Popup.css";
import lottie from "lottie-web";
import { defineElement } from "lord-icon-element";
<script src="https://cdn.lordicon.com/ritcuqlt.js"></script>

// define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation);

export default function PrivateRoute({ children, roles }) {
  const { user, role} = useAuth();
  const navigate = useNavigate();
  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    let timeoutId;

    if (!user) {
      timeoutId = setTimeout(() => {
        if (!user) {
          setOpenPopup(true);
        }
      }, 1000);
    } else {
      if(roles.length !== 0) {
        if(!roles.includes(role)) {
          setOpenPopup(true);
        }
      }
    }

    return () => clearTimeout(timeoutId);

  }, [user, navigate])

  function handleClose() {
    setOpenPopup(false);
    navigate('/')
  }

  if(openPopup) {
    return (
      <div>
        <Popup
          open={openPopup}
          closeOnDocumentClick
          onClose={handleClose}
        >
          <div className="modal-header">
            <lord-icon
                src="https://cdn.lordicon.com/tdrtiskw.json"
                trigger="hover"
                colors="primary:#e83a30,secondary:#f5f5f5"
                state="hover-2"
                class="lord-size-error">
            </lord-icon>
          </div>
          <div className="modal-container">
            <div className='modal-error'>
              <p>You are not authorized to access this page.</p>
              <p>Please click outside the popup</p>
            </div>
          </div>
        </Popup>
      </div>
    )
  } else {
    return children;
  }
}
