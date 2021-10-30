import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import Login from './Components/login';
import Signup from './Components/signup';

import Dashboard from './Components/dashboard';
function App(){
  let history = useHistory();
    return(
      <>
      <Navbar bg="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home" style={{color:"white",fontWeight:"bolder"}}>Registeration Form</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto">
              <Nav.Link onClick={() => { history.push("/dashboard") }} style={{color:"white",fontWeight:"bolder"}}>Dashboard</Nav.Link>
              <Nav.Link onClick={() => { history.push("/") }} style={{color:"white",fontWeight:"bolder"}}>Signup</Nav.Link>

              <Nav.Link onClick={() => { history.push("/login") }} style={{color:"white",fontWeight:"bolder"}}>Login</Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>


      <Switch>
        <Route path="/login">
          <Login />
        </Route>

        <Route path="/dashboard">
          <Dashboard />
        </Route>

        <Route exact path="/">
          <Signup />
        </Route>

      </Switch>

    </>
   
  )
  
}
export default App;