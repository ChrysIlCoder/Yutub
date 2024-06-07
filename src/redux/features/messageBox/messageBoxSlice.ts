import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IMessageBoxInitalState {
  opened: boolean;
  message?: string;
  onClick?: () => void;
}

const initialState: IMessageBoxInitalState = {
  opened: false,
  message: '',
  onClick: () => {},
}

const messageBoxSlice = createSlice({
  name: 'messageBox',
  initialState,
  reducers: {
    setMessageBoxState: (state, action: PayloadAction<IMessageBoxInitalState>) => {
      const { opened, message, onClick } = action.payload

      return { ...state, opened, message, onClick }
    }
  }
})

const getMessageBox = ({ messageBox }: { messageBox: IMessageBoxInitalState }) => messageBox

export const messageBoxSelector = {
  getMessageBox,
}

export const { actions, reducer } = messageBoxSlice