/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


// interface UserPayLoad {
//     id?: string;
//     email: string,
//     name: string,
// }

interface Blog {
    id?: number
    title: string
    author: string
    content: string
}


export const fetchListBlog = createAsyncThunk(
    'users/fetchListBlog',
    async () => {
        const res = await fetch("http://localhost:8000/blogs");

        const data = await res.json();

        return data
    },
)

export const CreateNewBlog = createAsyncThunk(
    'users/createNewBlog',
    async (payload: Blog, thunkAPI) => {
        const res = await fetch("http://localhost:8000/blogs", {
            method: 'POST',
            body: JSON.stringify({
                title: payload.title,
                author: payload.author,
                content: payload.content

            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        if (data && data.id) {
            thunkAPI.dispatch(fetchListBlog())
        }


        return data
    },
)

export const UpdateBlog = createAsyncThunk(
    'users/updateBlog',
    async (payload: Blog, thunkAPI) => {
        const res = await fetch(`http://localhost:8000/blogs/${payload.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                title: payload.title,
                author: payload.author,
                content: payload.content

            }),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        if (data && data.id) {
            thunkAPI.dispatch(fetchListBlog())
        }
        return data
    },
)

export const DeleteBlog = createAsyncThunk(
    'users/deleteBlog',
    async (payload: any, thunkAPI) => {
        const res = await fetch(`http://localhost:8000/blogs/${payload.id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        thunkAPI.dispatch(fetchListBlog())
        return data
    },
)



const initialState: { listBlog: Blog[], isCreateBlog: boolean, isUpdateBlog: boolean, isDeleteBlog: boolean } = {
    listBlog: [],
    isCreateBlog: false,
    isUpdateBlog: false,
    isDeleteBlog: false,
}

export const userSlide = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        resetCreate: (state) => {
            state.isCreateBlog = false
        },
        resetUpdate: (state) => {
            state.isUpdateBlog = false
        },
        resetDelete: (state) => {
            state.isDeleteBlog = false
        }
    },

    extraReducers: (builder) => {
        builder.addCase(fetchListBlog.fulfilled, (state, action) => {
            state.listBlog = action.payload
        })

        builder.addCase(CreateNewBlog.fulfilled, (state) => {
            state.isCreateBlog = true
        })
        builder.addCase(UpdateBlog.fulfilled, (state) => {
            state.isUpdateBlog = true
        })
        builder.addCase(DeleteBlog.fulfilled, (state) => {
            state.isDeleteBlog = true
        })
    },
})

// Action creators are generated for each case reducer function
export const { resetCreate, resetUpdate, resetDelete } = userSlide.actions

export default userSlide.reducer