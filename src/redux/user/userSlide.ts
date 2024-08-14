/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


interface UserPayLoad {
    id?: string;
    email: string,
    name: string,
}

interface User {
    id: number;
    name: string;
    email: string;
}

export const fetchListUser = createAsyncThunk(
    'users/fetchListUser',
    async () => {
        const res = await fetch("http://localhost:8000/users");

        const data = await res.json();

        return data
    },
)

export const CreateNewUser = createAsyncThunk(
    'users/createNewUser',
    async (payload: UserPayLoad, thunkAPI) => {
        const res = await fetch("http://localhost:8000/users", {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                name: payload.name
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        if (data && data.id) {
            thunkAPI.dispatch(fetchListUser())
        }


        return data
    },
)

export const UpdateUser = createAsyncThunk(
    'users/updateUser',
    async (payload: UserPayLoad, thunkAPI) => {
        const res = await fetch(`http://localhost:8000/users/${payload.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                email: payload.email,
                name: payload.name
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        if (data && data.id) {
            thunkAPI.dispatch(fetchListUser())
        }
        return data
    },
)

export const DeleteUser = createAsyncThunk(
    'users/deleteUser',
    async (payload: any, thunkAPI) => {
        const res = await fetch(`http://localhost:8000/users/${payload.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        thunkAPI.dispatch(fetchListUser())
        return data
    },
)



const initialState: { listUsers: User[], isCreateUser: boolean, isUpdateUser: boolean, isDeleteUser: boolean } = {
    listUsers: [],
    isCreateUser: false,
    isUpdateUser: false,
    isDeleteUser: false,
}

export const userSlide = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetCreate: (state) => {
            state.isCreateUser = false
        },
        resetUpdate: (state) => {
            state.isUpdateUser = false
        },
        resetDelete: (state) => {
            state.isDeleteUser = false
        }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchListUser.fulfilled, (state, action) => {
            state.listUsers = action.payload
        })
        builder.addCase(CreateNewUser.fulfilled, (state) => {
            state.isCreateUser = true
        })
        builder.addCase(UpdateUser.fulfilled, (state) => {
            state.isUpdateUser = true
        }),
            builder.addCase(DeleteUser.fulfilled, (state) => {
                state.isDeleteUser = true
            })
    },
})

// Action creators are generated for each case reducer function
export const { resetCreate, resetUpdate, resetDelete } = userSlide.actions

export default userSlide.reducer