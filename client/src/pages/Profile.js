import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { QUERY_SINGLE_USER, QUERY_ME } from "../utils/queries";
import Auth from "../utils/auth";

import "./profile.css";

const Profile = () => {
  const { userId } = useParams;
  const { loading, data } = useQuery(userId ? QUERY_SINGLE_USER : QUERY_ME, {
    variables: { userId },
  });

  const user = data?.me || data?.user || {};
  if (Auth.loggedIn() && Auth.getProfile().data._id === userId) {
    return <Navigate to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    <h4>You need to be looged in to see your profile.</h4>;
  }
  return (
    <div className="bg">
      <div className="profile_container">
        <div className="profile_top">
          <div className="profile_image">
            <img src="./images/004-tennis.png"></img>
          </div>
          <h4 className="profile_username">{user.username}</h4>
        </div>

        <div className="profile_bottom">
          <div className="profile_details">
            {user.location?.locationName ? (
              <div>
                <img className="profile_icon" src="./images/003-check.png"></img>
                <p>Current Location: {user.location.locationName}</p>
                <img className="profile_icon" src="./images/001-stopwatch.png"></img>
                <p>Check-in at:{user.location.checkin}</p>
              </div>
            ) : (
              <div>
                <img className="profile_icon" src="./images/002-rivalry.png"></img>
                <p>Status: Still Looking...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
