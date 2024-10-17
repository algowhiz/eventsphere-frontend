import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    _id: null,
    name: '',
    email: '',
    phone: '',
    isVerified: false,
    createdAt: '',
    eventsHosted: {
        attendedEvents:0,
        free: 0,
        offline: 0,
        online: 0,
        paid: 0,
        total: 0,
    },
    savedEvents:0,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            return { ...state, ...action.payload };
        },
        updateUser(state, action) {
            return { ...state, ...action.payload };
        },
        clearUser() {
            return initialState;
        },
        setSavedEvents(state, action) {
            state.savedEvents = action.payload;
        },
        setEventsHosted(state, action) {
            state.eventsHosted = action.payload;
        },
    },
});

export const { setUser, clearUser, updateUser, setEventsHosted ,setSavedEvents} = userSlice.actions;

export default userSlice.reducer;
