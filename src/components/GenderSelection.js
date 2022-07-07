import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setGender } from "../features/filter/filterSlice";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function GenderSelection() {
  const dispatch = useDispatch();
  const gender = useSelector((state) => state.filter.gender);

  const handleChange = (event) => {
    dispatch(setGender(event.target.value));
  };

  return (
    <div className="gender-filter">
      <FormControl sx={{ minWidth: 120 }} size="small">
        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={gender}
          label="Gender"
          onChange={handleChange}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="female">Female</MenuItem>
          <MenuItem value="male">Male</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default GenderSelection;
