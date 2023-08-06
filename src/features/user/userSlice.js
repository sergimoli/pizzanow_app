//to install redux I did: npm i @reduxjs/toolkit react-redux
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAddress } from '../../services/apiGeocoding';

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

//remember that Redux is syncronows. if we want to use anyting async we must use thunks(middleware that sits between the dispatching and the reducer itself.).
// we pass the action name and async function that return the payload for the reducer later.
export const fetchAddress = createAsyncThunk(
  'user/fetchAdress',
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    //payload  of the fulfilled state
    return { position, address };
  },
);

// i've decided that this user state is going to be a global UI state because we need the state in many places in the application tree. We will need in the header, for hte component that says 'you full name'... well, in  many places...
const initialState = {
  username: '',
  status: 'idle',
  position: {},
  address: '',
  error: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      //depending promise state
      .addCase(fetchAddress.pending, (state, action) => {
        state.status = 'loading';
      })
      //fullfilled sstate (the case is success)
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = 'idle';
      })
      //rejected state (when error)
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = 'error';
        state.error =
          'There was a problem getting your addres. maake sure to fill the field.';
      }),
});

export const { updateName } = userSlice.actions;

export default userSlice.reducer;
