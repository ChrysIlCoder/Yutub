import { createSlice } from "@reduxjs/toolkit";
import { IChannel, ISubscribeToChannel, IDefaultServerMessage, IModifyChannelInfo } from "../../../../../models/Channels"
import { SAGAS_FLOW_NAMES } from "../../sagas";

interface IChannelInitalState {
  loading: boolean;
  channel: IChannel;
  tab_selected: 'videos' | 'informations' | 'subscribed';
}

const initialState: IChannelInitalState = {
  loading: false,
  channel: {} as IChannel,
  tab_selected: 'videos',
};

const channelsSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false

      state.channel = {} as IChannel
    },
    setIsLoading: (state, action) => {
      state.loading = action.payload;
    },
    setChannelByIdInfo: (state, action) => {
      state.channel = action.payload;
    },
    setSelectedTab: (state, action) => {
      state.tab_selected = action.payload
    }
  },
});

const getChannelByIdInfo = ({ channels }: { channels: IChannelInitalState }) => channels.channel;

const getSelectedTab = ({ channels }: { channels: IChannelInitalState }) => channels.tab_selected;

export const channelsSelectors = {
  getChannelByIdInfo,
  getSelectedTab,
};

export const { actions, reducer } = channelsSlice

export const channelsSagaActions = {
  sagaGetChannelById: (id: string | undefined) => ({ type: SAGAS_FLOW_NAMES.GET_CHANNEL_BY_ID, payload: id }),
  sagaSubscribeToChannel: (body: ISubscribeToChannel, onSuccess: (data: IDefaultServerMessage) => void, onFailure: (error: any) => void) => ({ type: SAGAS_FLOW_NAMES.SUBSCRIBE_TO_CHANNEL, payload: { body, onSuccess, onFailure } }),
  sagaUnSubscribeFromChannel: (body: ISubscribeToChannel, onSuccess: (data: IDefaultServerMessage) => void, onFailure: (error: any) => void) => ({ type: SAGAS_FLOW_NAMES.UNSUBSCRIBE_FROM_CHANNEL, payload: { body, onSuccess, onFailure } }),
  sagaModifyChannelInfo: (body: IModifyChannelInfo, id: string, part: 'name' | 'description' | 'banner' | 'profile_pic', onSuccess: (data: IDefaultServerMessage) => void, onFailure: (error: any) => void) => ({ type: SAGAS_FLOW_NAMES.MODIFY_CHANNEL_INFO, payload: { body, id, part, onSuccess, onFailure}})
}