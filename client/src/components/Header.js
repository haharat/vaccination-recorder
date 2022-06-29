import React from "react";
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userAction'
import { Link } from "react-router-dom";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap"
import "../styles/style.css";

const Header = () => {
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const handleLogout = () => {
        dispatch(logout())
    };

    return (
        <Navbar bg="primary" expand="lg" variant="dark">
            <Container>
            <Navbar.Brand>Vaccination Record APP</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link ><Link to={`/recordList`} className="nav-link">My Record</Link></Nav.Link>
                        <Nav.Link href="#"><Link to={`/recommendation`} className="nav-link">My Recommendation</Link></Nav.Link>
                        <Nav.Link href="#"><Link to={`/recordCard`} className="nav-link">My Card</Link></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    {userInfo ? (
                        <Nav className="me-auto">
                            <Navbar.Text className="nav-text">Welcome, {userInfo.username}</Navbar.Text>
                            <Nav.Link><Link to={`/login`} onClick={handleLogout} className="nav-link active">Log Out</Link></Nav.Link>
                        </Nav>
                    ) : (
                        <Nav className="me-auto">
                            <Nav.Link className="nav-link active"><Link to={`/login`} className="nav-link active">Log In</Link></Nav.Link>
                            <Nav.Link className="nav-link active"><Link to={`/register`} className="nav-link active">Register</Link></Nav.Link>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
