import React, { useState, useEffect } from 'react';
// import { useMutation } from '@apollo/client';

import React, { useState } from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api';

import {formatRelative} from 'date-fns';

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


const libraries = ["places"];

//size of google map screen
const mapContainerStyle = {
    width: '100vw',
    height: "85vh",
  }


////initial display - Gellert Park, Daly City, CA
const center = {
    lat: 37.662546,
    lng: -122.471321,
  };

//Style of Google Maps
const options = {
    mapTypeId: 'satellite',
    tilt: 0,
    disableDefaultUI: true,
    zoomControl: true, 
  }


function Home() {
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: "AIzaSyCtTgv741GIni8QktYKLPiJDyZdQyyVhAY",
        // googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries, 
      })

      //using react state hook to render
      const [markers, setMarkers] = useState([]);
      const [selected, setSelected] = useState(null);

     //avoid recreating function when render
  const onMapClick = React.useCallback((event)=> {
    console.log(event);
    setMarkers(current => [...current, {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      time: new Date(),
    }])
  }, []);


  //use useRef to retain state without causing rerenders
  //use useState when we want to rerender
  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map)=>{
    mapRef.current = map;
  }, []);

  //this function pan to the latlng where use hv chosen
  //set it as no defs
  //zoom in
  const panTo = React.useCallback(({lat, lng }) => {
    mapRef.current.panTo({lat, lng});
    mapRef.current.setZoom(18);
  }, [])

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';



return(
<div>
      <h1>WHOS THERE <span>🎾</span></h1>
      {/* passin panTo prop */}
      <Search panTo={panTo} />

      <GoogleMap 
      mapContainerStyle={mapContainerStyle} 
      zoom={20} 
      center={center}
      options={options}
      onClick={onMapClick}
      onLoad={onMapLoad}
       >

        {markers.map((marker) => (
        <Marker 
          //modify key to be ???
          key={marker.time.toISOString()}
          position={{ lat:marker.lat, lng:marker.lng }}
          icon={{
            url:'/images/001-tennis.png',
            scaledSize: new window.google.maps.Size(30,30),
            // center the marker when clicked
            origin: new window.google.maps.Point(0,0),
            anchor: new window.google.maps.Point(15,15),

          }}
          onClick={()=> {
            setSelected(marker);
          }}
          />
          ))}
           {selected ? (
          <InfoWindow 
          position={{lat:selected.lat, lng:selected.lng}}
          onCloseClick={()=> {
            setSelected(null);
          }}>
            <div>
              <h2>I am here!</h2>
              <p>I got here at {formatRelative(selected.time, new Date())}</p>
            </div>
          </InfoWindow>) : null}
      </GoogleMap>
      <footer>footer</footer>
    </div>
)

}


export default Home;