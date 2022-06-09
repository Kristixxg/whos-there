import React, { useState } from 'react';
// import { useMutation } from '@apollo/client';
import './home.css';

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
    height: "78vh",
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
    </div>
)
}

//search bar 

function Search({panTo}) {
    const {ready, value, suggestions: {status, data}, setValue, clearSuggestions,} = usePlacesAutocomplete({
      requestOptions: {
        location: { lat: () => 37.662546, lng: () => -122.471321 },
        radius: 200 * 1000,
      },
    });
  
  
    return ( 
    <div className='search'> 
      {/* when a user selects one of the suggestions that are showing, 
      we call setValue state to be the address the user picked and set it without going to google and fetch data */}
      <Combobox 
      //using async becase we'll be using promises 
        onSelect={ async (address) => {
          //reposition where the latlng is when a place is clicked in the searchbar popover
          // no need to get address from google api
          setValue(address, false);
          // clearing out the suggestions after
          clearSuggestions();
  
          try {
            const results = await getGeocode({address});
            //getLatLng function (comes in with autocomplete pkg) can extract  latlng
            const {lat, lng} = await getLatLng(results[0]);
            panTo({lat, lng});
          } catch (error) {
            console.log("error!")
          }
  
          }}    
        >
        <ComboboxInput className="searchInput" value={value} onChange={(e) => {
          setValue(e.target.value);
        }}
        disabled={!ready}
        placeholder='Enter an address'/>
  
        <ComboboxPopover>
          {status === 'OK' && 
          data.map(({id, description}) => (
            <ComboboxOption key={id} value={description} />
            ))}
        </ComboboxPopover>
      </Combobox>
    </div>
    )
  };



export default Home;