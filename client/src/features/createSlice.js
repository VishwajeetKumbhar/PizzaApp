import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// export const getAllData = createAsyncThunk("pizzaDaats", async () => {
//     const responce = await fetch("http://localhost:8005/getData");
//     const result = responce.json();
//     return result;
// })
export const showUser = createAsyncThunk("showUser", async (args, { rejectWithValue }) => {
    const response = await fetch(
        "https://pizza-app-two-kappa.vercel.app/getData"
    );
    try {
        const result = await response.json();
        return result;
    } catch (error) {
        return rejectWithValue(error);
    }
}
);

export const pizzaData = createSlice({
    name: "pizaaData",
    initialState: {
        users: [],
        loading: false,
        error: null
    },
    extraReducers:{
     
        [showUser.pending]: (state) => {
            state.loading = true;
        },
        [showUser.fulfilled]: (state, action) => {
            state.loading = false;
            state.users = action.payload;
        },
        [showUser.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }

})

export default pizzaData.reducer;