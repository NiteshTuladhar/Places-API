import { PlacesContext } from "@/context/placesContext";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const UserDropDown = () => {
  const { user, setUser } = useContext(PlacesContext) as PlacesContextType;
  const [userList, setUsersList] = useState<UserType[]>([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/users`).then((res: any) => {
      setUsersList(res.data);
    });
  }, []);

  function handleChange(event: SelectChangeEvent) {
    setUser(
      userList.filter((each) => each.id === parseInt(event.target.value))[0]
    );
  }
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">User</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        defaultValue=""
        label="Age"
        onChange={handleChange}
      >
        {userList
          ? userList.map((user: UserType, index) => {
              return (
                <MenuItem key={index} value={user.id}>
                  {user.name}
                </MenuItem>
              );
            })
          : ""}
      </Select>
    </FormControl>
  );
};

export default UserDropDown;
