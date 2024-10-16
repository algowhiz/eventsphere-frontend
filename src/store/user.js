import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    _id: null,
    name: '',
    email: '',
    phone: '',
    isVerified: false,
    createdAt: '',
    eventsHosted: {
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
        setEventsHosted(state, action) {
            state.eventsHosted = { ...state.eventsHosted, ...action.payload };
        },
    },
});

export const { setUser, clearUser, updateUser, setEventsHosted } = userSlice.actions;

export default userSlice.reducer;
