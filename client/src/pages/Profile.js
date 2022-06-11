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
  console.log(user);
  if (Auth.loggedIn() && Auth.getProfile().data._id === userId) {
    return <Navigate to="/profile" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    <h4>You need to be looged in to see your profile.</h4>;
  }
  console.log(user.username);
  // console.log(user.location.locationName);
  return (
    <div className="bg">
      <div className="profile_container">
        <div className="profile_top">
          <div className="profile_image">
            <img src="./images/004-tennis.png"></img>
          </div>
          <p className="profile_username">Username:{user.username}</p>
        </div>

        <div className="profile_bottom">
          <div className="profile_details">
            {user.location?.locationName
            ? 
            <div>
              <p>Current Location:${user.location.locationName}</p>
              <p>Check-in at:</p>
            </div>
            :
            <p>Status: Not using a court currently</p>
            }

          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;
