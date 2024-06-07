import { createSlice } from "@reduxjs/toolkit";
import { IVideo, IVideos } from "../../../../../models/Videos";
import { SAGAS_FLOW_NAMES } from "../../sagas";

interface IVideosInitalState {
  isLoading: boolean;
  videos: IVideos;
  video: IVideo;
}

const initialState: IVideosInitalState = {
  isLoading: false,
  videos: {} as IVideos,
  video: {} as IVideo
};

const videosSlice = createSlice({
  name: "videos",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;

      state.videos = {} as IVideos;
      state.video = {} as IVideo;
    },
    setIsLoading: (state, actions) => {
      state.isLoading = actions.payload;
    },
    setVideosList: (state, actions) => {
      state.videos = actions.payload;
    },
    setVideoInfo: (state, actions) => {
      state.video = actions.payload;
    }
  }
});

const getIsLoading = ({ videos }: { videos: IVideosInitalState }) => videos.isLoading;

const getVideosList = ({ videos }: { videos: IVideosInitalState }) => videos.videos;

const getVideoInfo = ({ videos }: { videos: IVideosInitalState }) => videos.video;

export const videosSelector = {
  getIsLoading,
  getVideosList,
  getVideoInfo,
};

export const { actions, reducer } = videosSlice;

export const videosSagaActions = {
  sagaGetVideos: () => ({ type: SAGAS_FLOW_NAMES.GET_VIDEOS }),
  sagaGetVideoByUUID: (uuid: string | undefined) => ({ type: SAGAS_FLOW_NAMES.GET_VIDEO_BY_UUID, payload: uuid }), 
  sagaPostVideo: (body: any, onSuccess: (data: IVideo) => void, onFailure: (error: any) => void) => ({ type: SAGAS_FLOW_NAMES.POST_VIDEO, payload: { body, onSuccess, onFailure } }),
  sagaPutVideosViews: (uuid: string) => ({ type: SAGAS_FLOW_NAMES.PUT_VIDEOS_VIEWS, payload: uuid }),
};
