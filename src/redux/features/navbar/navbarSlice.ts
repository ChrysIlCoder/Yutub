import { createSlice } from "@reduxjs/toolkit";

interface INavbarInitalState {
    sidebar_opened: boolean;
}

const initialState: INavbarInitalState = {
    sidebar_opened: true,
}

const navbarSlice = createSlice({
    name: 'navbar',
    initialState,
    reducers: {
        setOpenSidebar: (state, actions) => {
            state.sidebar_opened = actions.payload
        }
    }
})

const getSidebarState = ({ navbar }: { navbar: INavbarInitalState }) => navbar.sidebar_opened

export const navbarSelector = {
    getSidebarState,
}

export const { actions, reducer } = navbarSlice