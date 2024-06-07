import { createSlice } from "@reduxjs/toolkit";
import { SAGAS_FLOW_NAMES } from "../../sagas";
import { IComment, IComments, IDeletedComment, IEditComment, IEditedComment, INewComment } from "../../../../../models/Comments";

export interface ICommentInitalState {
  isLoading: boolean;
  comments: IComments;
}

const initialState: ICommentInitalState = {
  isLoading: false,
  comments: {} as IComments
}

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false

      state.comments = {} as IComments
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
    setVideosCommentsInfo: (state, action) => {
      state.comments = action.payload
    }
  }
})

const getIsLoading = ({ comments }: { comments: ICommentInitalState }) => comments.isLoading

const getVideosCommentsInfo = ({ comments }: { comments: ICommentInitalState }) => comments.comments

export const commentsSelector = {
  getIsLoading,
  getVideosCommentsInfo,
}

export const { actions, reducer } = commentsSlice

export const commentsSagaActions = {
  sagaCreateNewCommentWithVideoUUID: (body: INewComment, onSuccess: (data: IComment) => void, onFailure: (error: any) => void) => ({ type: SAGAS_FLOW_NAMES.CREATE_NEW_COMMENT_WITH_VIDEO_UUID, payload: {body, onSuccess, onFailure} }),
  sagaGetCommentsOfVideoUUID: (uuid: string) => ({ type: SAGAS_FLOW_NAMES.GET_COMMENTS_OF_VIDEO_UUID, payload: uuid }),
  sagaEditCommentById: (body: IEditComment, onSuccess: (data: IEditedComment) => void, onFailure: (error: any) => void) => ({ type: SAGAS_FLOW_NAMES.EDIT_COMMENT_BY_ID, payload: { body, onSuccess, onFailure } }),
  sagaDeleteCommentById: (id: string, onSuccess: (data: IDeletedComment) => void, onFailure: (error: any) => void) => ({ type: SAGAS_FLOW_NAMES.DELETE_COMMENT_BY_ID, payload: { id, onSuccess, onFailure } })
}