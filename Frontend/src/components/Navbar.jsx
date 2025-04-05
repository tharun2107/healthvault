// // src/components/Navbar.jsx
// import React, { useEffect, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const Navbar = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [goals, setGoals] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const user = JSON.parse(localStorage.getItem('user'));

//     if (token && user) {
//       setIsLoggedIn(true);
//       setGoals(user.goals || []);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     setIsLoggedIn(false);
//     navigate('/login');
//   };

//   const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light shadow-sm sticky-top" style={{ backgroundColor: '#e6fff2' }}>
//       <div className="container">
//         <Link className="navbar-brand fw-bold text-success" to="/" style={{ fontSize: '24px', transition: '0.3s' }}>
//           <span className="animated-brand">Health<span className="text-dark">Vault</span></span>
//         </Link>

//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMenu">
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         <div className="collapse navbar-collapse" id="navbarMenu">
//           <ul className="navbar-nav ms-auto">
//             {isLoggedIn ? (
//               <>
//                 {goals.map((goal, index) => (
//                   <li className="nav-item" key={index}>
//                     <Link className="nav-link text-success" to={`/${goal.toLowerCase()}`}>
//                       {capitalize(goal)}
//                     </Link>
//                   </li>
//                 ))}
//                 <li className="nav-item">
//                   <button className="btn btn-outline-success ms-2" onClick={handleLogout}>Logout</button>
//                 </li>
//               </>
//             ) : (
//               <>
//                 <li className="nav-item"><Link className="nav-link text-success" to="/signup">Signup</Link></li>
//                 <li className="nav-item"><Link className="nav-link text-success" to="/login">Login</Link></li>
//               </>
//             )}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// src/components/Navbar.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchNotifications, markAllAsRead } from '../utils/api';
import { FaBell } from 'react-icons/fa';
import NotificationModal from './NotificationModal';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [goals, setGoals] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (token && user) {
      setIsLoggedIn(true);
      setGoals(user.goals || []);
      loadNotifications();
    }
  }, []);

  const loadNotifications = async () => {
    try {
      const response = await fetchNotifications();
      setNotifications(response.data);
      setUnreadCount(response.data.filter(n => !n.read).length);
    } catch (error) {
      console.error("❌ Error fetching notifications:", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate('/login');
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead();
      toast.success("All notifications marked as read");
      await loadNotifications();
      setUnreadCount(0);
    } catch (err) {
      console.error("Error marking as read:", err);
      toast.error("Failed to mark as read");
    }
  };

  const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light shadow-sm sticky-top" style={{ backgroundColor: '#e6fff2' }}>
        <div className="container">
          <Link className="navbar-brand fw-bold text-success" to="/" style={{ fontSize: '24px' }}>
            Health<span className="text-dark">Vault</span>
          </Link>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMenu">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarMenu">
            <ul className="navbar-nav ms-auto align-items-center">
              {isLoggedIn ? (
                <>
                  {goals.map((goal, index) => (
                    <li className="nav-item" key={index}>
                      <Link className="nav-link text-success" to={`/${goal.toLowerCase()}`}>
                        {capitalize(goal)}
                      </Link>
                    </li>
                  ))}

                  <li className="nav-item position-relative mx-2" style={{ cursor: 'pointer' }} onClick={handleOpenModal}>
                    <FaBell className="text-success fs-5" />
                    {unreadCount > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {unreadCount > 5 ? '5+' : unreadCount}
                      </span>
                    )}
                  </li>

                  <li className="nav-item">
                    <button className="btn btn-outline-success ms-2" onClick={handleLogout}>Logout</button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item"><Link className="nav-link text-success" to="/signup">Signup</Link></li>
                  <li className="nav-item"><Link className="nav-link text-success" to="/login">Login</Link></li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {modalOpen && (
        <NotificationModal
          notifications={notifications}
          onClose={() => setModalOpen(false)}
          onMarkAllRead={handleMarkAllAsRead}
        />
      )}
    </>
  );
};

export default Navbar;
