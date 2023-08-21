import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  uploadPhoto: 'hello',
  uploadVideo: '',
  uploadAudio: '',
};

export const uploadSlice = createSlice({
  name: 'uploadSlice',
  initialState,
  reducers: {
    photoUpload: (state, action) => {
      state.uploadPhoto = action.payload;
    },
    videoUpload: (state, action) => {
      state.uploadVideo = action.payload;
    },
    audioUpload: (state, action) => {
      state.uploadAudio = action.payload;
    },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // },
  },
});

// Action creators are generated for each case reducer function
export const {photoUpload, videoUpload, audioUpload} = uploadSlice.actions;

export default uploadSlice.reducer;
