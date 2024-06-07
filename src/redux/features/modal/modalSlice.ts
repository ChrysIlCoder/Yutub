import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ReactElement, ReactNode } from "react";

interface IModalInitalState {
    title?: string;
    body?: ReactElement | ReactNode | undefined;
}

const initialState: IModalInitalState = {
    title: '',
    body: undefined
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setModal: (state, action: PayloadAction<IModalInitalState>) => {
            const { body, title } = action.payload;
            return { ...state, body, title };
        }
    }
})

const getModalState = ({ modal }: { modal: IModalInitalState }) => modal

export const modalSelector = {
    getModalState,
}

export const { actions, reducer } = modalSlice