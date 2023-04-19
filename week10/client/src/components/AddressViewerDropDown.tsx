import React, {Dispatch, SetStateAction} from "react";
import {useQuery} from "@apollo/client";
import GetAllAddresses from "../queries/GetAddresses";
import {Address} from "../types";
import {MenuItem, Select, SelectChangeEvent} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

type Props = {
    setAddressId: Dispatch<SetStateAction<string>>;
}

export default function AddressViewerDropDown({setAddressId}:Props ) {
    const query = useQuery(GetAllAddresses);
    if (query.loading) return <p>Loading ...</p>;
    else if (query.error) return <p>Error: {query.error.message}</p>;

    const handleChange = (event: SelectChangeEvent<string>):void => {
        setAddressId(event.target.value);
    };
    return (
        <div>
            <FormControl sx={{m:1, minWidth:120}}>
                <InputLabel id="demo-simple-select-helper-label">Address</InputLabel>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    label="Address"
                    onChange={handleChange}>
                    {query.data.addresses.map((address:Address)=><MenuItem key={address.id} value={address.id}>
                        {address.street}
                    </MenuItem>)}
                </Select>
            </FormControl>
        </div>
    )
}