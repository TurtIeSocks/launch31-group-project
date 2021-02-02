import React, { useState, useEffect } from "react"
import getCurrentUser from "../services/getCurrentUser"

const UserProfile = ({ user }) => {
  const [currentUser, setCurrentUser] = useState("")

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
    <div>
      <h1>{currentUser.username}</h1>
    </div>
  )
}

export default UserProfile
