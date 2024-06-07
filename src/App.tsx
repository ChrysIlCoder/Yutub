import './App.css'
import { Modal } from './components/Modal/Modal'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import Home from './pages/Home'
import VideoPage from './pages/VideoPage'
import AuthPage from './pages/AuthPage'
import ChannelPage from './pages/ChannelPage'
import MessageBox from './components/Modal/MessageBox/MessageBox'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { accountsActions } from './redux/saga/accounts/slice'
import { accountsSagaActions } from './redux/saga/accounts/slice/accountsSlice'
import SubscriptionsPage from './pages/SubscriptionsPage'
import SettingsPage from './pages/SettingsPage'
import TrendingVideosPage from './pages/TrendingVideosPage'
import ResultPage from './pages/ResultPage'

export default function App() {
  const dispatch = useDispatch()
  
  useEffect(() => {
    const account = window.localStorage.getItem("account_info")

    if (account) {
      dispatch(accountsSagaActions.sagaLoginIntoAccount({ body: JSON.parse(account), onSuccess: (data) => {
        if (data.status === 200) dispatch(accountsActions.setLoggedIn(true))
      }, onFailure: () => {}}))
    } else {
      dispatch(accountsActions.setLoggedIn(false))
    }
  }, [])
  
  return (
    <BrowserRouter>
      <MessageBox />
      <Modal />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/videos/watch/:uuid' element={<VideoPage />} />
        <Route path='/account/enter' element={<AuthPage />} />
        <Route path='/channel/:id' element={<ChannelPage />} />
        <Route path='/:id/subscriptions' element={<SubscriptionsPage />} />
        <Route path='/settings' element={<SettingsPage />} />
        <Route path='/trending' element={<TrendingVideosPage />} />
        <Route path='/search' element={<ResultPage />} />
      </Routes>
    </BrowserRouter>
  )
}