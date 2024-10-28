import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink as RouterNavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { clearUser, selectUserID, selectUserName, selectRole ,selectUserProfile } from '../redux/userSlice';
import logo from '../assets/logo.png';
import schoolLogo from '../assets/gvm.png';
import Swal from 'sweetalert2';
import Modal from 'react-bootstrap/Modal';
import { IoIosArrowDropdownCircle } from "react-icons/io";


const NavbarContainer = styled.nav`
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  position: sticky;
`;

const Logo = styled(RouterNavLink)``;

const NavLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const NavLink = styled(RouterNavLink)`
  color: black;
  text-decoration: none;
  font-size: 1.4rem;
  font-weight: 600;
  transition: color 0.3s ease;
  font-family: Nunito, sans-serif;

  &.active  {
    color: #8400EB;
  }
`;

const UserInfo = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const DropButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
  z-index: 1000;

  & > button {
    background: none;
    border: none;
    padding: 0.8rem 1.5rem;
    width: 100%;
    text-align: left;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #bde0fe;
    }
  }
`;

const AppNavbar = () => {
  const userID = useSelector(selectUserID);
  const userName = useSelector(selectUserName);
  const userRole = useSelector(selectRole);
  const profile = useSelector(selectUserProfile);
  console.log(profile); 
  

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showProfile , setShowProfile] = useState(false);


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure you want to logout?',
      text: "You will be redirected to the login page.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearUser());
        navigate('/auth/login');
        Swal.fire('Logged Out!', 'You have been successfully logged out.', 'success');
      }
    });
  };

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  const handleClose = () => setShowProfile(false);
  const handleShow = () => setShowProfile(true);


  return (
    <>
    <NavbarContainer>
      <Logo to="/">
        <img src={logo} alt="Progress Matrix" style={{ height: '3.5rem', marginRight: '20px' }} />
      </Logo>
      <NavLinks>
        <NavLink to={userRole === 'admin' ? "/admin/dashboard" : "/teacher/dashboard"}>Dashboard</NavLink>
        {userRole === 'admin' && <NavLink to="/admin/staff">Staff</NavLink>}
        {userRole === 'teacher' && (
          <>
            <NavLink to="/teacher/manage-data">Manage Data</NavLink>
            <NavLink to="/teacher/result">Result</NavLink>
          </>
        )}
      </NavLinks>

      <UserInfo>
        <DropButton onClick={toggleDropdown}style={{display:'flex'}}>
          {userName} <span style={{marginLeft : "7px"}}/> {userRole === 'teacher' && <span> ID : {userID} </span>} <span><IoIosArrowDropdownCircle style={{marginTop:'2px',marginLeft:'10px',fontSize:'20px'}} /></span>
        </DropButton>
        {dropdownOpen && (
          <DropdownMenu>
            <button onClick={handleShow}>Profile</button>
            <button onClick={handleLogout}>Logout</button>
          </DropdownMenu>
        )}
      </UserInfo>
    </NavbarContainer>

    <Modal show={showProfile} onHide={handleClose}>
      <Modal.Header closeButton>
        {userRole === 'admin' ?<Modal.Title>School Profile</Modal.Title>:
        <Modal.Title>Teacher's Profile</Modal.Title>}
      </Modal.Header>
      <Modal.Body>
        <img src={schoolLogo} alt="School Logo" style={{ height: '7rem', width: '7rem', borderRadius: '50%', marginBottom: '1rem', float: 'right' }} />
        {userRole === 'admin' ?
        <>
          <h3 style={{fontSize: '2rem'}}>{profile.schoolData.school_name}</h3>
          <h3 style={{fontSize: '2rem'}}>{profile.schoolData.school_id}</h3>
          <h3 style={{fontSize: '2rem'}}>{profile.schoolData.school_dist}</h3>
          <h3 style={{fontSize: '2rem'}}>{profile.schoolData.school_add}</h3>
        </> : 
        <>
          <h3 style={{fontSize: '2rem'}}>{`${profile.teacher_fname} ${profile.teacher_lname}`}</h3>
        </>}
      </Modal.Body>
    </Modal>
  </>
  );
};

export default AppNavbar;
