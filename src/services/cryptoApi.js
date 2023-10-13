import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const headers = {
    'X-RapidAPI-Key': '2407191a71msh0feb0f6e5eed76dp1b6153jsnbc1db2b281ff',
    'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
}

export const getCryptos = createAsyncThunk('cryptosSlice/getCryptos',
        async (count)=> {
            const {data} = await axios.get(`https://coinranking1.p.rapidapi.com/coins?limit=${count}`,
            {
                headers
            })
            return data.data
        })

export const getExchanges = createAsyncThunk('cryptosSlice/getExchanges',
async ()=> {
    const {data} = await axios.get(`https://coinranking1.p.rapidapi.com/exchanges`,
    {
        headers
    })
    return data.data
})

export const getCoin = createAsyncThunk('cryptosSlice/getCoin',
async (coinId)=> {
    const {data} = await axios.get(`https://coinranking1.p.rapidapi.com/coin/${coinId}`,
    {
        headers
    })
    return data.data
})

export const getCoinHistory = createAsyncThunk('cryptosSlice/getCoinHistory',
async ({coinId,timePeriod})=> {
    const {data} = await axios.get(`https://coinranking1.p.rapidapi.com/coin/${coinId}/history?timeperiod=${timePeriod}`,
    {
        headers
    })
    return data
})

const initialState = {isLoading:false, isError:null, data:{},coin:{},history:{},exchanges:{}}
const cryptosSlice = createSlice({
    name:'cryptosSlice',
    initialState,
    extraReducers:{
        [getCryptos.pending]:(state)=>{
            state.isLoading = true
        },
        [getCryptos.fulfilled]:(state,action)=>{
            state.data = action.payload
            state.isLoading = false
        },
        [getCoin.fulfilled]:(state,action)=>{
            state.coin = action.payload
        },
        [getCoinHistory.fulfilled]:(state,action)=>{
            state.history = action.payload
        },
        [getExchanges.fulfilled]:(state,action)=>{
            state.exchanges = action.payload
        }
        
    }
})

export const cryptosReducer = cryptosSlice.reducer
