import { takeLatest, put, call, fork } from 'redux-saga/effects'
import { SAGAS_FLOW_NAMES } from '../sagas'
import { IDeletedComment, IComments, IEditedComment } from '../../../../models/Comments'
import { CreateNewCommentWithVideoUUID } from '../../../../models/services/comments/createNewCommentWithVideoUUID'
import { commentsActions } from './slice'
import { GetCommentsOfVideoUUID } from '../../../../models/services/comments/getCommentsOfVideoUUID'
import { DeleteCommentById } from '../../../../models/services/comments/deleteCommentById'
import { EditCommentById } from '../../../../models/services/comments/editCommentById'

function* createNewCommentWithVideoUUID(action: any) {
  const method = "[💬➕] createNewCommentWithVideoUUID"
  console.log(method)

  const url = `/comments/new`

  const { body, onSuccess, onFailure } = action.payload

  try {
    yield put(commentsActions.setIsLoading(true))
    
    const data: IComments = yield call(CreateNewCommentWithVideoUUID, url, body)

    console.log(`${method} - getCommentInfo: ${JSON.stringify(data, null, 2)}`)
    yield call(onSuccess)
    return
  } catch (error) {
    yield call(onFailure)
    console.log(`${method} - error: ${error}`);
    console.log(`${method} - error: ${JSON.stringify(error, null, 2)}`);
  } finally {
    yield put(commentsActions.setIsLoading(false))
    console.log(`${method} - end`);
  }
}

function* getCommentsOfVideoUUID(action: any) {
  const method = "[💬] getCommentsOfVideoUUID"
  console.log(method)

  const url = `/comments/of`

  try {
    yield put(commentsActions.setIsLoading(true))
    
    const data: IComments = yield call(GetCommentsOfVideoUUID, url, action.payload)
    console.log(`${method} - getVideoComments: ${JSON.stringify(data, null, 2)}`)

    yield put(commentsActions.setVideosCommentsInfo(data))
  } catch (error) {
    console.log(`${method} - error: ${error}`);
    console.log(`${method} - error: ${JSON.stringify(error, null, 2)}`);
  } finally {
    yield put(commentsActions.setIsLoading(false))
    console.log(`${method} - end`);
  }
}

function* editCommentById(action: any) {
  const method = "[💬💥🖕] getCommentsOfVideoUUID"
  console.log(method)

  const { body, onSuccess, onFailure } = action.payload

  const url = `/comments/edit`

  try {
    yield put(commentsActions.setIsLoading(true))
    
    const data: IEditedComment = yield call(EditCommentById, url, body)
    console.log(`${method} - editCommentById: ${JSON.stringify(data, null, 2)}`)

    onSuccess?.(data)
  } catch (error) {
    onFailure?.(error)
    console.log(`${method} - error: ${error}`);
    console.log(`${method} - error: ${JSON.stringify(error, null, 2)}`);
  } finally {
    yield put(commentsActions.setIsLoading(false))
    console.log(`${method} - end`);
  }
}

function* deleteCommentById(action: any) {
  const method = "[💬💥🖕] getCommentsOfVideoUUID"
  console.log(method)

  const { id, onSuccess, onFailure } = action.payload

  const url = `/comments/delete`

  try {
    yield put(commentsActions.setIsLoading(true))
    
    const data: IDeletedComment = yield call(DeleteCommentById, url, id)
    console.log(`${method} - deleteCommentById: ${JSON.stringify(data, null, 2)}`)

    onSuccess?.(data)
  } catch (error) {
    onFailure?.(error)
    console.log(`${method} - error: ${error}`);
    console.log(`${method} - error: ${JSON.stringify(error, null, 2)}`);
  } finally {
    yield put(commentsActions.setIsLoading(false))
    console.log(`${method} - end`);
  }
}

function* watchCreateNewCommentWithVideoUUID() {
  yield takeLatest(SAGAS_FLOW_NAMES.CREATE_NEW_COMMENT_WITH_VIDEO_UUID, createNewCommentWithVideoUUID)
}

function* watchGetCommentsOfVideoUUID() {
  yield takeLatest(SAGAS_FLOW_NAMES.GET_COMMENTS_OF_VIDEO_UUID, getCommentsOfVideoUUID)
}

function* watchEditCommentById() {
  yield takeLatest(SAGAS_FLOW_NAMES.EDIT_COMMENT_BY_ID, editCommentById)
}

function* watchDeleteCommentById() {
  yield takeLatest(SAGAS_FLOW_NAMES.DELETE_COMMENT_BY_ID, deleteCommentById)
}

export const commentsSaga = [fork(watchCreateNewCommentWithVideoUUID), fork(watchGetCommentsOfVideoUUID), fork(watchDeleteCommentById), fork(watchEditCommentById)]