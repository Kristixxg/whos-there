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
  




function Home() {

return(
    <>
    <h1>THIS IS THE HOMEPAGE!</h1>
    </>
)

}


export default Home;