import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { hot } from "react-hot-loader/root"

import getCurrentUser from "../services/getCurrentUser"
import "../assets/scss/main.scss"
import RegistrationForm from "./registration/RegistrationForm"
import SignInForm from "./authentication/SignInForm"
import TopBar from "./layout/TopBar"
import GenreIndex from "./genre/GenreIndex.js"
import AuthenticatedRoute from "./authentication/AuthenticatedRoute"
import UserProfile from "./UserProfile.js"
import PodcastsIndex from "./podcasts/PodcastsIndex.js"
import PodcastShowPage from "./podcasts/PodcastShowPage.js"
import PodcastGenreShow from "./genre/PodcastGenreShow.js"
import GenreForm from './genre/GenreForm.js' 

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined)

  const fetchCurrentUser = async () => {
    try {
      const user = await getCurrentUser()
      setCurrentUser(user)
    } catch (err) {
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/">
          <h2>Hello from react</h2>
        </Route>
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <Route exact path="/podcasts" component={PodcastsIndex} />
        <Route exact path="/podcasts/:id" component={PodcastShowPage} />
        <Route exact path="/genres" component={GenreIndex} />
        <Route exact path="/genres/new" component={GenreForm} />
        <Route exact path="/genres/:id" component={PodcastGenreShow} />
        <AuthenticatedRoute exact path="/profile" component={UserProfile} user={currentUser} />
      </Switch>
    </Router>
  )
}

export default hot(App)
