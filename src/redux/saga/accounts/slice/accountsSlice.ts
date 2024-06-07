import { createSlice } from "@reduxjs/toolkit";
import { IAccount, IAccountRecived, ILogin } from '../../../../../models/Accounts'
import { SAGAS_FLOW_NAMES } from "../../sagas";
import { IChannel } from "../../../../../models/Channels";

interface IAccountInformationInitalState {
    isLoading: boolean;
    accounts: IAccount;
    loggedAccount: IAccountRecived;
    loggedIn: boolean;
    accountSubscriptions: IChannel[];
}

const initialState: IAccountInformationInitalState = {
    isLoading: false,
    accounts: {} as IAccount,
    loggedAccount: {} as IAccountRecived,
    loggedIn: false,
    accountSubscriptions: [] as IChannel[]
}

const accountsSlice = createSlice({
    name: 'accounts',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.loggedIn = false

            state.accounts = {} as IAccount
            state.loggedAccount = {} as IAccountRecived
            state.accountSubscriptions = [] as IChannel[]
        },
        setIsLoading: (state, actions) => {
            state.isLoading = actions.payload
        },
        setLoggedIn: (state, actions) => {
            state.loggedIn = actions.payload
        },
        setLoggedAccountInfo: (state, actions) => {
            state.loggedAccount = actions.payload
        },
        setAccountSubscriptionsInfo: (state, actions) => {
            state.accountSubscriptions = actions.payload
        }
    }
})

const getIsLoading = ({ accounts }: { accounts: IAccountInformationInitalState }) => accounts.isLoading

const getAccountsInfo = ({ accounts }: { accounts: IAccountInformationInitalState }) => accounts.accounts

const getLoggedAccountInfo = ({ accounts }: { accounts: IAccountInformationInitalState }) => accounts.loggedAccount

const getAccountSubscriptionsInfo = ({ accounts }: { accounts: IAccountInformationInitalState }) => accounts.accountSubscriptions

const getLoggedIn = ({ accounts }: { accounts: IAccountInformationInitalState }) => accounts.loggedIn

export const accountsSelector = {
    getIsLoading,
    getAccountsInfo,
    getLoggedAccountInfo,
    getAccountSubscriptionsInfo,
    getLoggedIn,
}

export const { actions, reducer } = accountsSlice

export const accountsSagaActions = {
    sagaCreateNewAccount: (body: IAccountRecived, onSuccess: (data: IAccountRecived) => void, onFailure: (error: any) => void) => ({ type: SAGAS_FLOW_NAMES.CREATE_NEW_ACCOUNT, payload: { body, onSuccess, onFailure } }),
    sagaLoginIntoAccount: (payload: { body: ILogin; onSuccess: (data: IAccountRecived) => void; onFailure: (error: any) => void}) => ({ type: SAGAS_FLOW_NAMES.LOGIN_INTO_ACCOUNT, payload: payload }),
    sagaGetAccountSubscriptions: (id: string | undefined) => ({ type: SAGAS_FLOW_NAMES.GET_ACCOUNT_SUBSCRIPTIONS, payload: id })
}