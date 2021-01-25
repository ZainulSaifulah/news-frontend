import React from "react";
import { Button, Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import Home from './Home';
import Content from './Content';

import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  state = {
    query: ""
  }

  search(event){
    console.log(event.target.value)

    this.setState({
      query: event.target.value
    })
  }

  render() {
    return (
      <Router>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">
            <img
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/content">Content</Nav.Link>
            </Nav>
            <Form inline onSubmit={() => this.setState({query: this.state.input})}>
              <FormControl type="text" value={this.state.input} onChange={ event => this.setState({input: event.target.value})} placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success" onClick={() => this.setState({query: this.state.input}) }>Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
        <div>
          <Switch>
            <Route path="/content/:country" children={<Child />}/>
            <Route path="/content">
              <Content query = {this.state.query} />
            </Route>
            <Route path="/">
              <Home query = {this.state.query} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

function Child() {
  let { country } = useParams()

  return (
    <Content country = {country} />
  )
}


export default App;
