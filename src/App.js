import React, { Fragment, useState } from "react";
import Navbar from "./components/layout/Navbar";
import Alert from "./components/layout/Alert";
import Users from "./components/users/Users";
import User from "./components/users/User";
import Search from "./components/users/Search";
import About from "./components/pages/About";
import axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
const App = () => {
  const [users,setUsers] = useState([]);
  const [user,setUser] = useState({});
  const [repos,setRepos] = useState([]);
  const [loading,setLoading] = useState(false);
  const [alert,setAlert] = useState(null);

  const getUser = async username => {
    setLoading(true)
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_SECRET}`
    );
    setUser(res.data);
    setLoading(false);
  };
  const getUsersRepos = async username => {
    setLoading(true)
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_SECRET}`
    );
    setRepos(res.data);
    setLoading(false);
  };
  const clearUsers = () => {
    console.log("clear");
    setUsers([]);
  };
  const searchUsers = async text => {
    setLoading(true)
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_SECRET}`
    );
    setUsers(res.data.items);
    setLoading(false);
  };

  const showAlert = (msg, type) => {
    setAlert({
      msg,
      type
    })
    
    setTimeout(() => {
      setAlert(null );
    }, 2000);
  };
  return (
    <Router>
      <div className="App">
        <Navbar title="Github Finder" />
        <Alert alert={alert} />

        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <Fragment>
                <Search
                  clearUsers={clearUsers}
                  searchUsers={searchUsers}
                  showClear={users.length > 0}
                  setAlert={showAlert}
                />
                <Users loading={loading} users={users} />
              </Fragment>
            )}
          />
          <Route exact path="/about" component={About} />
          <Route
            exact
            path="/user/:login"
            render={props => (
              <User
                {...props}
                getUser={getUser}
                getUsersRepos={getUsersRepos}
                user={user}
                repos={repos}
                loading={loading}
              />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
