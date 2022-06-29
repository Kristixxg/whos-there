import React, { useState } from "react";
// import { useMutation } from '@apollo/client';
import "./home.css";
import Geocode from "react-geocode";
import Auth from '../utils/auth';

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

import { formatRelative, subDays } from "date-fns";
import { useParams } from "react-router-dom";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME, QUERY_SINGLE_USER, QUERY_USERS } from "../utils/queries";
import { SAVE_LOCATION, REMOVE_LOCATION } from '../utils/mutations';

const libraries = ["places"];
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);
Geocode.setLanguage("en");

let newlat;
let newlng;
let addressUser;



//size of google map screen
const mapContainerStyle = {
  width: "100vw",
  height: "70vh",
};

////initial display - Golden gate park, SF CA
const center = {
  lat: 37.7686208,
  lng: -122.4899138,
};

//Style of Google Maps
const options = {
  mapTypeId: "satellite",
  tilt: 0,
  // disableDefaultUI: true,
};



function Home() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  // adding username to the marker
  const { userId } = useParams;
  const { loading, data } = useQuery(userId ? QUERY_SINGLE_USER : QUERY_ME, {
    variables: { userId },
  });

  const user = data?.me || data?.user || {};

  if (!user?.username) {
    <h4>You need to be looged in to see your profile.</h4>;
  }

  //using react state hook to render
  const [markers, setMarkers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [userSelected, setUserSelected] =  useState(null);
  const [locationName, setLocationAddress] = useState('');

  //const [latlng, setLatlng] =useState(null);

  const [saveLocation, {error}] = useMutation(SAVE_LOCATION);
  const [removeLocation, {remove_error} ] = useMutation(REMOVE_LOCATION);


  const {data:dataLatLng} = useQuery(QUERY_USERS);

  const users = dataLatLng?.users || []; 





  const handleDeleteLocation = async (locationId) => {
    try {
      const response = await removeLocation({
        variables: { locationId: locationId}
      });
      // if (!response.ok) {
      //   throw new Error("something went wrong!");
      // }
    } catch (error) {
      console.error(error);
    }
  };



  //avoid recreating function when render
  const onMapClick = React.useCallback((event) => {

    newlat= event.latLng.lat();
    // console.log(newlat);
    newlng = event.latLng.lng();
    // console.log(newlng);

    // setLatlng({
    //   newlat,
    //   newlng
    // })
    // console.log(latlng);
    // console.log(new Date());
    // console.log(event);



    setMarkers((current) => [
      // ...current,
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);



  //*************************trying to display all user icons***************//
  const handleSaveLocation = async (event) => {
    try {
      const { data } = await saveLocation({
        variables:{
        locationName: addressUser,
        checkin: " " + new Date().toString(),
        latitude: newlat.toString(),
        longitude: newlng.toString(),
        },
      });
    } catch (err) {
      console.error(err);
    }
  };


  //use useRef to retain state without causing rerenders
  //use useState when we want to rerender
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  //this function pan to the latlng where use hv chosen
  //set it as no defs
  //zoom in
  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(18);
  }, []);

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";





  // console.log(users[0].location.latitude);

  return (
    <div>
      {/* passin panTo prop */}

      <Search panTo={panTo} />
      <Locate panTo={panTo} />
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={11}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >

        {users.map((user) => {
          return user.location ? (
            <>
          <Marker
              key={user._id}
              position={{lat: parseFloat(user.location.latitude),lng: parseFloat(user.location.longitude)}}
              icon={{
                url: "/images/003-direction.png",
                scaledSize: new window.google.maps.Size(50, 50),
              }}
              onClick={() => {
                setUserSelected(user);
              }}
          />
          {userSelected ? (
          <InfoWindow
            position={{lat: parseFloat(user.location.latitude),lng: parseFloat(user.location.longitude)}}
            options={{
                pixelOffset: new window.google.maps.Size(
                  0, -30
                ),
                maxWidth:320
              }}
            onCloseClick={() => {
              setUserSelected(null);
            }}
            >
             <div className="infobox">
              <div className="infoTitle">
                <img className="infoboxImg" src="./images/002-target.png"></img>
                <h3>{user.username}</h3>
              </div>
              {/* <p className="infowinText">{user.location.checkin}</p> */}
              <p className="infowinText">{user.location.locationName}</p>
            </div>
          </InfoWindow>
           ) : null}

          </>
          )
          :
          (
          <Marker
              key={user._id}
              position= {{lat: 37.779567089675034, lng: -122.47907017284403 }}
              icon={{
                url: "/images/003-direction.png",
                scaledSize: new window.google.maps.Size(50, 50),
              }}
          />  
          
          )         
          })}

        
        {markers.map((marker) => (
            <Marker
              //modify key to be ???
              key={marker.time.toISOString()}
              position={{ lat: marker.lat, lng: marker.lng }}
            
              // position={{lat: 37.779567089675034, lng: -122.47907017284403 }}
              // draggable={true}
              icon={{
                url: "/images/002-placeholder.png",
                // url: "/images/001-user.png",
                scaledSize: new window.google.maps.Size(50, 50),
                // center the marker when clicked
                // origin: new window.google.maps.Point(0, 0),
                // anchor: new window.google.maps.Point(25, 25),
              }}
              onClick={() => {
                setSelected(marker);
                Geocode.fromLatLng(newlat, newlng).then(
                  (response) => {
                    addressUser = response.results[0].formatted_address;
                    // console.log(addressUser);
                  },
                  (error) => {
                    console.error(error);
                  }
                );
                handleSaveLocation();
              }}
            />
        ))}

        {selected ? (
          <InfoWindow
            position={{ 
              lat: selected.lat, 
              lng: selected.lng,
               }}
            options={{
                pixelOffset: new window.google.maps.Size(
                  0, -30
                ),
                maxWidth:320
              }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div className="infobox">
              <div className="infoTitle">
                <img className="infoboxImg" src="./images/004-search.png"></img>
                <h2>{user.username}</h2>
              </div>
              <h3 className="infowinText">You are here {formatRelative(selected.time, new Date())}</h3>
              {/* <h3 className="infowinText">My current location: {newlat},{newlng}</h3> */}
              <h3 className="infowinText">{addressUser}</h3>

              {/* <p>{user.location._id}</p> */}

              <button className="infoBtn" onClick={() => {setMarkers([]); setSelected(null); handleDeleteLocation(user.location._id)}}>Check Out</button>
              {Auth.loggedIn()
              ?
             null
             :
              <div className="infoFooter">
                <img className="infoFooterImg" src="./images/001-warning.png"></img>
                <h4 className="" >Login to save data</h4>
              </div>
              }
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}







//locate user current address
function Locate({ panTo }) {
  return (
    <button
      className="locate"
      onClick={() => {
        // assuming all the model browser will have geolocation
        //first arg is when we are able to get position
        //second arg is when run into error, if error we do nothing-null, not deal with the error
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // console.log(position);
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null,
          options
        );
      }}
    >
      <img src="images/001-compass.png" alt="compass: locate me"></img>
    </button>
  );
}

//search bar
function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 37.662546, lng: () => -122.471321 },
      radius: 200 * 1000,
    },
  });

  return (
    <div className="search">
      {/* when a user selects one of the suggestions that are showing, 
      we call setValue state to be the address the user picked and set it without going to google and fetch data */}
      <Combobox 
        //using async becase we'll be using promises
        onSelect={async (address) => {
          //reposition where the latlng is when a place is clicked in the searchbar popover
          // no need to get address from google api
          // console.log(address);
          setValue(address, false);
          // clearing out the suggestions after
          clearSuggestions();

          try {
            const results = await getGeocode({ address });
            //getLatLng function (comes in with autocomplete pkg) can extract  latlng
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
          } catch (error) {
            console.log("error!");
          }
        }}
      >
        <ComboboxInput
          className="searchInput"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={!ready}
          placeholder="Enter an address"
        />

        <ComboboxPopover className="first">
          {status === "OK" &&
            data.map(({ id, description }) => (
              <ComboboxOption key={id} value={description} />
            ))}
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}

export default Home;
