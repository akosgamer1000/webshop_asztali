import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./store/authSlice";
import settingsReducer from "./store/settingsSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const store = configureStore({
    reducer:{
        auth: authReducer,
        settings: settingsReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>();
export default store;