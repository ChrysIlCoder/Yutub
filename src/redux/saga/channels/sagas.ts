import { put, call, takeLatest, fork } from 'redux-saga/effects'
import { SAGAS_FLOW_NAMES } from '../sagas'
import { IChannel, IDefaultServerMessage } from '../../../../models/Channels'
import { channelsActions } from './slice'
import { GetChannelById } from '../../../../models/services/channels/getChannelById'
import { SubscribeToChannel } from '../../../../models/services/channels/subscribeToChannel'
import { UnSubscribeFromChannel } from '../../../../models/services/channels/unSubscribeFromChannel'
import { ModifyChannelInfo } from '../../../../models/services/channels/modifyChannelInfo'
 
function* getChannelById(action: any) {
  const method = "[📹] getChannelById"
  console.log(method)

  const url = `/channel`

  try {
    yield put(channelsActions.setIsLoading(true))
    
    const data: IChannel = yield call(GetChannelById, url, action.payload)
    console.log(`${method} - getChannelById: ${JSON.stringify(data, null, 2)}`)

    yield put(channelsActions.setChannelByIdInfo(data))
  } catch (error) {
    console.log(`${method} - error: ${error}`);
    console.log(`${method} - error: ${JSON.stringify(error, null, 2)}`);
  } finally {
    yield put(channelsActions.setIsLoading(false))
    console.log(`${method} - end`);
  }
}

function* subscribeToChannel(action: any) {
  const method = "[🙋➕] subscribeToChannel"
  console.log(method)

  const url = `/channel/subscribe`

  const { body, onSuccess, onFailure } = action.payload

  try {
    yield put(channelsActions.setIsLoading(true))
    
    const data: IDefaultServerMessage = yield call(SubscribeToChannel, url, body)
    console.log(`${method} - subscribeToChannel: ${JSON.stringify(data, null, 2)}`)

    onSuccess?.(data)
  } catch (error) {
    console.log(`${method} - error: ${error}`);
    console.log(`${method} - error: ${JSON.stringify(error, null, 2)}`);
    onFailure?.(error)
  } finally {
    yield put(channelsActions.setIsLoading(false))
    console.log(`${method} - end`);
  }
}

function* unSubscribeFromChannel(action: any) {
  const method = "[🙋➖] unSubscribeToChannel"
  console.log(method)

  const url = `/channel/unsubscribe`

  const { body, onSuccess, onFailure } = action.payload

  try {
    yield put(channelsActions.setIsLoading(true))
    
    const data: IDefaultServerMessage = yield call(UnSubscribeFromChannel, url, body)
    console.log(`${method} - unSubscribeToChannel: ${JSON.stringify(data, null, 2)}`)

    onSuccess?.(data)
  } catch (error) {
    console.log(`${method} - error: ${error}`);
    console.log(`${method} - error: ${JSON.stringify(error, null, 2)}`);
    onFailure?.(error)
  } finally {
    yield put(channelsActions.setIsLoading(false))
    console.log(`${method} - end`);
  }
}

function* modifyChannelInfo(action: any) {
  const method = "[🧍🔧] modifyChannelInfo"
  console.log(method)
  
  const { body, part, id, onSuccess, onFailure } = action.payload

  const url = `/channel/edit/${part}?channel_id=${id}`

  try {
    yield put(channelsActions.setIsLoading(true))
    
    const data: IDefaultServerMessage = yield call(ModifyChannelInfo, url, body)
    console.log(`${method} - modifyChannelInfo: ${JSON.stringify(data, null, 2)}`)

    onSuccess?.(data)
  } catch (error) {
    console.log(`${method} - error: ${error}`);
    console.log(`${method} - error: ${JSON.stringify(error, null, 2)}`);
    onFailure?.(error)
  } finally {
    yield put(channelsActions.setIsLoading(false))
    console.log(`${method} - end`);
  }
}

function* watchGetChannelById() {
  yield takeLatest(SAGAS_FLOW_NAMES.GET_CHANNEL_BY_ID, getChannelById)
}

function* watchSubscribeToChannel() {
  yield takeLatest(SAGAS_FLOW_NAMES.SUBSCRIBE_TO_CHANNEL, subscribeToChannel)
}

function* watchUnSubscribeFromChannel() {
  yield takeLatest(SAGAS_FLOW_NAMES.UNSUBSCRIBE_FROM_CHANNEL, unSubscribeFromChannel)
}

function* watchModifyChannelInfo() {
  yield takeLatest(SAGAS_FLOW_NAMES.MODIFY_CHANNEL_INFO, modifyChannelInfo)
}

export const channelsSaga = [fork(watchGetChannelById), fork(watchSubscribeToChannel), fork(watchUnSubscribeFromChannel), fork(watchModifyChannelInfo)]