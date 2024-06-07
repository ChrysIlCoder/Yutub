import { takeLatest, put, call, fork } from "redux-saga/effects";
import { SAGAS_FLOW_NAMES } from "../sagas";
import { videosActions } from "./slice";
import { IVideo, IVideos } from "../../../../models/Videos";

import { GetVideos } from "../../../../models/services/videos/getVideos";
import { GetVideoByUUID } from "../../../../models/services/videos/getVideoByUUID";
import { PostVideo } from "../../../../models/services/videos/postVideo";
import { PutVideosViews } from "../../../../models/services/videos/putVideosViews";

function* getVideos() {
  const method = "[📹] getVideos";
  console.log(method);

  const url = `/videos/all`;

  try {
    yield put(videosActions.setIsLoading(true));

    const data: IVideos = yield call(GetVideos, url);
    console.log(`${method} - getVideosList: ${JSON.stringify(data, null, 2)}`);

    yield put(videosActions.setVideosList(data));
  } catch (error) {
    console.log(`${method} - error: ${error}`);
    console.log(`${method} - error: ${JSON.stringify(error, null, 2)}`);
  } finally {
    yield put(videosActions.setIsLoading(false));
    console.log(`${method} - end`);
  }
}

function* getVideoByUUID(action: any) {
  const method = "[📹📍] getVideoByUUID";
  console.log(method);

  const url = `/videos/video`;

  try {
    yield put(videosActions.setIsLoading(true));

    const data: IVideos = yield call(GetVideoByUUID, url, action.payload);
    console.log(`${method} - getVideoByUUID: ${JSON.stringify(data, null, 2)}`);

    yield put(videosActions.setVideoInfo(data));
  } catch (error) {
    console.log(`${method} - error: ${error}`);
    console.log(`${method} - error: ${JSON.stringify(error, null, 2)}`);
  } finally {
    yield put(videosActions.setIsLoading(false));
    console.log(`${method} - end`);
  }
}

function* postVideo(action: any) {
  const method = "[📼] postVideo";
  console.log(method);

  const { body, onSuccess, onFailure } = action.payload;

  const url = `/videos/post`;

  try {
    yield put(videosActions.setIsLoading(true));

    const data: IVideo = yield call(PostVideo, url, body);
    console.log(`${method} - postVideo: ${JSON.stringify(data, null, 2)}`);

    while (data?.status !== 200) {
      alert("Uploading");
    }

    onSuccess(data);
  } catch (error) {
    onFailure(error);
    console.log(`${method} - error: ${error}`);
    console.log(`${method} - error: ${JSON.stringify(error, null, 2)}`);
  } finally {
    yield put(videosActions.setIsLoading(false));
    console.log(`${method} - end`);
  }
}

function* putVideosViews(action: any) {
  const method = "[📹] putVideosViews";
  console.log(method);

  const url = `/videos/add/views`;

  try {
    yield put(videosActions.setIsLoading(true));

    const data: IVideos = yield call(PutVideosViews, url, action.payload);
    console.log(`${method} - putVideosViews: ${JSON.stringify(data, null, 2)}`);
  } catch (error) {
    console.log(`${method} - error: ${error}`);
    console.log(`${method} - error: ${JSON.stringify(error, null, 2)}`);
  } finally {
    yield put(videosActions.setIsLoading(false));
    console.log(`${method} - end`);
  }
}

function* watchPutVideosViews() {
  yield takeLatest(SAGAS_FLOW_NAMES.PUT_VIDEOS_VIEWS, putVideosViews);
}

function* watchPostVideo() {
  yield takeLatest(SAGAS_FLOW_NAMES.POST_VIDEO, postVideo);
}

function* watchGetVideos() {
  yield takeLatest(SAGAS_FLOW_NAMES.GET_VIDEOS, getVideos);
}

function* watchGetVideoByUUID() {
  yield takeLatest(SAGAS_FLOW_NAMES.GET_VIDEO_BY_UUID, getVideoByUUID);
}

export const videosSaga = [
  fork(watchGetVideos),
  fork(watchGetVideoByUUID),
  fork(watchPostVideo),
  fork(watchPutVideosViews)
];
