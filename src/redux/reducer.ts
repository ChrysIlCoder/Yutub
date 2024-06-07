import { combineReducers } from "@reduxjs/toolkit";

import { accountsReducer } from "./saga/accounts/slice";
import { navbarReducer } from "./features/navbar";
import { videosReducer } from "./saga/videos/slice";
import { modalReducer } from "./features/modal";
import { commentsReducer } from "./saga/comments/slice";
import { channelsReducer } from "./saga/channels/slice";
import { messageBoxReducer } from "./features/messageBox";

export default combineReducers({
    // Redux
    navbar: navbarReducer,
    modal: modalReducer,
    messageBox: messageBoxReducer,

    // Saga
    accounts: accountsReducer,
    videos: videosReducer,
    comments: commentsReducer,
    channels: channelsReducer,
})