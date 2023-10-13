import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const headers = {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Key': '2407191a71msh0feb0f6e5eed76dp1b6153jsnbc1db2b281ff',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
}

export const getCryptosNews = createAsyncThunk('cryptosNewsSlice/getCryptosNews',
        async ({category,count})=> {
            const {data} = await axios.get(`https://bing-news-search1.p.rapidapi.com/news/search?q=${category}&freshness=Day&textFormat=Raw&safeSearch=Off&count=${count}`,
            {
                headers
            })
            return data?.value
        })

const initialState = {isLoading:false, isError:null, data:[]}
const cryptosNewsSlice = createSlice({
    name:'cryptosNewsSlice',
    initialState,
    extraReducers:{
        [getCryptosNews.pending]:(state)=>{
            state.isLoading = true
        },
        [getCryptosNews.fulfilled]:(state,action)=>{
            state.data = action.payload
            state.isLoading = false
        }
        
    }
})

export const cryptosNewsReducer = cryptosNewsSlice.reducer
