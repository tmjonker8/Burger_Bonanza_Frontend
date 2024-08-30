import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectBox() {
  const [category, setCategory] = React.useState('');

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 230, marginX: 1 }}>
      <FormControl fullWidth>
        <InputLabel id="select-category">Category</InputLabel>
        <Select
          labelId="select-category"
          id="select-category"
          value={category}
          label="Category"
          onChange={handleChange}
        >
          <MenuItem value={"Appetizer"}>Appetizer</MenuItem>
          <MenuItem value={"Salad"}>Salad</MenuItem>
          <MenuItem value={"Burger"}>Burger</MenuItem>
          <MenuItem value={"Special"}>Special</MenuItem>
          <MenuItem value={"Dessert"}>Dessert</MenuItem>
          <MenuItem value={"Entree"}>Entree</MenuItem>
          <MenuItem value={"Side"}>Side</MenuItem>
          <MenuItem value={"Drink"}>Drink</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}