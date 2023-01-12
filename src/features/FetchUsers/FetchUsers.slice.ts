import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import usersApi from "../../api/usersApi";
import {RootState} from "../../app/store";
import {FetchUsersParams, UsersStateRedux} from "../../interfaces/interfaces";
import {AxiosError} from "axios";

interface ValidationErrors {
    errorMessage: string
    field_errors: Record<string, string>
}
export const fetchUser = createAsyncThunk(
    "fetchUsers",
    async ({since,per_page}:FetchUsersParams,thunkAPI) => {
       try {
           return  usersApi.getUsers({since, per_page});
       } catch (err) {
           // @ts-ignore
           let error: AxiosError<ValidationErrors> = err // cast the error for access
           if (!error.response) {
               throw err
           }
           // We got validation errors, let's return those so we can reference in our component and set form errors
           return thunkAPI.rejectWithValue(error.response.data.errorMessage)
       }
    }
)
const initialState = {
    error: "",
    loading: false,
    usersData: [],
    lastId:1,
} as UsersStateRedux;
const usersSlice = createSlice({
    name: "UserSlice",
    initialState,
    reducers: {
        resetUsersTable: (state) => {
            state.usersData = [];
            state.lastId = 1;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state,action) => {
            state.loading = true;
        });builder.addCase(fetchUser.fulfilled, (state,action) => {
            state.loading = false;
            // @ts-ignore
            state.usersData.push(...action.payload);
            state.lastId = action.payload[action.payload.length - 1].id

        });builder.addCase(fetchUser.rejected, (state,action) => {
            state.loading = false;
            // @ts-ignore
            state.error = action.payload;
        });

    }
})

export default usersSlice.reducer;
export const {resetUsersTable} = usersSlice.actions;
export const getUsersState = (state:RootState) => state.users;