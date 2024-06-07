import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import reducer from "./reducer";
import rootSaga from "./saga/sagas";

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
    reducer: reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})

sagaMiddleware.run(rootSaga)

export default store