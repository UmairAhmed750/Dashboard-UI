'use client';
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from "./store"; // Path check karein


export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;