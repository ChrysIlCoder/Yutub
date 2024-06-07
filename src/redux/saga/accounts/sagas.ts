import { takeLatest, put, call, fork } from 'redux-saga/effects'
import { SAGAS_FLOW_NAMES } from '../sagas'
import { accountsActions } from './slice'
import { IAccountRecived, ILogin } from '../../../../models/Accounts'
import { CreateNewAccount } from '../../../../models/services/accounts/createNewAccount'
import { LoginIntoAccount } from '../../../../models/services/accounts/loginIntoAccount'
import { GetAccountSubscriptions } from '../../../../models/services/accounts/getAccountSubscriptions'
import { IChannel } from '../../../../models/Channels'

function* createNewAccount(action: any) {
    const method = "[🧍🆕] createNewAccount"
    console.log(method)

    const url = `/accounts/account/create`

    const { body, onSuccess, onFailure } = action.payload

    try {
        yield put(accountsActions.setIsLoading(true))

        const data: IAccountRecived = yield call(CreateNewAccount, url, body)
        console.log(`${method} - createNewAccount: ${JSON.stringify(data, null, 2)}`)
        
        onSuccess?.(data)
    } catch (error) {
        console.log(`${method} - error: ${error}`);
        console.log(`${method} - error: ${JSON.stringify(error, null, 2)}`);
        onFailure?.(error)
    } finally {
        yield put(accountsActions.setIsLoading(false))
        console.log(`${method} - end`);
    }
}

function* loginIntoAccount(action: any) {
    const method = "[🧍🔑] loginIntoAccount"
    console.log(method)

    const { body, onSuccess, onFailure } = action.payload

    const url = `/accounts/login`

    try {
        yield put(accountsActions.setIsLoading(true))

        const data: ILogin = yield call(LoginIntoAccount, url, body)
        console.log(`${method} - loginIntoAccount: ${JSON.stringify(data, null, 2)}`)

        yield put(accountsActions.setLoggedAccountInfo(data))
        onSuccess(data)
    } catch (error) {
        console.log(`${method} - error: ${error}`);
        console.log(`${method} - error: ${JSON.stringify(error, null, 2)}`);
        onFailure(error)
    } finally {
        yield put(accountsActions.setIsLoading(false))
        console.log(`${method} - end`);
    }
}

function* getAccountSubscriptions(action: any) {
    const method = "[🧍🤝👨‍👧] getAccountSubscriptions"
    console.log(method)

    const url = `/accounts/${action.payload}/subscriptions`

    try {
        yield put(accountsActions.setIsLoading(true))

        const data: IChannel[] = yield call(GetAccountSubscriptions, url)
        console.log(`${method} - getAccountSubscriptions: ${JSON.stringify(data, null, 2)}`)
        
        yield put(accountsActions.setAccountSubscriptionsInfo(data))
    } catch (error) {
        console.log(`${method} - error: ${error}`);
        console.log(`${method} - error: ${JSON.stringify(error, null, 2)}`);
    } finally {
        yield put(accountsActions.setIsLoading(false))
        console.log(`${method} - end`);
    }
}

function* watchLoginIntoAccount() {
    yield takeLatest(SAGAS_FLOW_NAMES.LOGIN_INTO_ACCOUNT, loginIntoAccount)
}

function* watchCreateNewAccount() {
    yield takeLatest(SAGAS_FLOW_NAMES.CREATE_NEW_ACCOUNT, createNewAccount)
}

function* watchGetAccountSubscriptions() {
    yield takeLatest(SAGAS_FLOW_NAMES.GET_ACCOUNT_SUBSCRIPTIONS, getAccountSubscriptions)
}

export const accountsSaga = [fork(watchCreateNewAccount), fork(watchLoginIntoAccount), fork(watchGetAccountSubscriptions)]