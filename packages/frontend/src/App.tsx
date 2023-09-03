import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import "./App.css";
import Routes from "./Routes.tsx";
import { useState, useEffect } from "react";
import { AppContext, AppContextType } fr

const [isAuthenticated, userHasAuthenticated] = useState(false);
const [isAuthenticating, setIsAuthenticating] = useState(true);

useEffect(() => {
  onLoad();
}, []);
async function onLoad() {
  try {
    await Auth.currentSession();
    userHasAuthenticated(true);
  } catch (e) {
    if (e !== "No current user") {
      alert(e);
    }
  }
  setIsAuthenticating(false);
}

function App() {
  function handleLogout() {
    userHasAuthenticated(false);
  }
  return (
    <div className="App container py-3">
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3 px-3">
        <LinkContainer to="/">
          <Navbar.Brand className="fw-bold text-muted">Scratch</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav activeKey={window.location.pathname}>
            {isAuthenticated ? (
              <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            ) : (
              <>
                <LinkContainer to="/signup">
                  <Nav.Link>Signup</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <AppContext.Provider
        value={{ isAuthenticated, userHasAuthenticated } as AppContextType}
      >
        <Routes />
      </AppContext.Provider>
    </div>
  );
}

export default App;
