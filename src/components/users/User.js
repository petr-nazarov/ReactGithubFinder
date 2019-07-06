import React, { useEffect } from "react";
import Loading from "../layout/Loading";
import Repos from "../repos/Repos";
import { Link } from "react-router-dom";
const User = ({ user, loading, getUser, getUsersRepos, repos, match }) => {
  useEffect(()=> {
    getUser(match.params.login);
    getUsersRepos(match.params.login);
  }, 
  //eslint-disable-next-line
  [])

  const {
    name,
    company,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    followers,
    public_gists,
    public_repos,
    following
  } = user;

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="section">
      <div className="container">
        <div className="columns">
          <div className="column">
            <Link to="/" className="button">
              {" "}
              &#60; Back{" "}
            </Link>
          </div>
        </div>
        <div className="box">
          <div className="columns">
            <div className="column is-6 has-text-centered">
              <div className="columns">
                <div className="column is-4" />
                <div className="column is-4">
                  <div className="image has-text-centered">
                    <img alt={name} className="is-rounded" src={avatar_url} />
                  </div>
                </div>
                <div className="column is-4" />
              </div>

              <h3 className="title is-3"> {name} </h3>
              <h5 className="subtitle is-4"> {location} </h5>
            </div>
            <div className="column is-6">
              <h4 className="title is-4">Bio</h4>
              <p className="content">{bio}</p>
              <a target="_blank" href={html_url} className="button is-primary">
                {" "}
                Visit Github Profile
              </a>
              <div className="content">
                <ul>
                  <li>
                    <b>Username:</b> {login}
                  </li>
                  <li>
                    <b>Company:</b> {company}
                  </li>
                  <li>
                    <b>Website:</b>{" "}
                    <a target="_blank" href={blog}>
                      {blog}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="box">
          <div className="content">
            <div className="tags are-medium has-text-centered">
              <span className="tag is-primary">Followers: {followers}</span>
              <span className="tag is-success">Following: {following}</span>
              <span className="tag is-link">Public Gists:{public_gists}</span>
              <span className="tag is-info">Public Repos: {public_repos}</span>
            </div>
          </div>
        </div>
        <Repos repos={repos} />
      </div>
    </div>
  );
};

export default User;