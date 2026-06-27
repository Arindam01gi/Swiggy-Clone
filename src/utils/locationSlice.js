import { createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
    name: "location",
    initialState: {
        lat: 22.6150956, // Default to previous hardcoded lat
        lng: 88.4185765, // Default to previous hardcoded lng
        address: "Kolkata, West Bengal", // Default address
    },
    reducers: {
        updateLocation: (state, action) => {
            state.lat = action.payload.lat;
            state.lng = action.payload.lng;
            if (action.payload.address) {
                state.address = action.payload.address;
            }
        },
    },
});

export const { updateLocation } = locationSlice.actions;
export default locationSlice.reducer;
