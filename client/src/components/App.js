import React, { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { hot } from "react-hot-loader/root"

import getCurrentUser from "../services/getCurrentUser"
import "../assets/scss/main.scss"
import RegistrationForm from "./registration/RegistrationForm"
import SignInForm from "./authentication/SignInForm"
import TopBar from "./layout/TopBar"
import GenreIndex from "./genres/GenreIndex.js"
import AuthenticatedRoute from "./authentication/AuthenticatedRoute"
import PodcastForm from "./podcasts/PodcastForm.js"
import UserProfile from "./UserProfile.js"
import PodcastsIndex from "./podcasts/PodcastsIndex.js"
import PodcastShowPage from "./podcasts/PodcastShowPage.js"
import GenreShow from "./genres/GenreShow.js"
import PodcastEditForm from './podcasts/PodcastEditForm.js'
import PodcastDeleteButton from './podcasts/PodcastDeleteButton.js'
import GenreForm from "./genres/GenreForm.js"
import GenreEditForm from './genres/GenreEditForm.js'
import GenreDeleteButton from './genres/GenreDeleteButton.js'

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
          <h2 className="welcome-header">Pod Classed: Classify Your Pod</h2>
          
        </Route>
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <Route exact path="/podcasts">
          <PodcastsIndex user={currentUser} />
        </Route>
        <AuthenticatedRoute exact path="/podcasts/new" component={PodcastForm} user={currentUser} />
        <Route exact path="/podcasts/:id/edit" component={PodcastEditForm} />
        <Route exact path="/podcasts/:id/delete" component={PodcastDeleteButton} />
        <Route exact path="/podcasts/:id">
          <PodcastShowPage user={currentUser} />
        </Route>
        <Route exact path="/genres">
          <GenreIndex user={currentUser} />
        </Route>
        <AuthenticatedRoute exact path="/genres/new" component={GenreForm} user={currentUser} />
        <Route exact path="/genres/:id/edit" component={GenreEditForm} />
        <Route exact path="/genres/:id/delete" component={GenreDeleteButton} />
        <Route exact path="/genres/:id">
          <GenreShow user={currentUser} />
        </Route>
        <AuthenticatedRoute exact path="/profile" component={UserProfile} user={currentUser} />
      </Switch>
    </Router>
  )
}

export default hot(App)
