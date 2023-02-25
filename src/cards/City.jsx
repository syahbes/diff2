import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {cities} from "../assets/cities"

export default function ComboBox() {
  const handleSelect = (event, value) => {
    console.log(`Selected value: ${value?.label}`);
  };
  return (
    <Autocomplete
      disablePortal
      id="combo-box"
      options={cities}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="עיר" />}
      onChange={handleSelect}
    />
  );
}
