import { useParams } from 'react-router-dom'
import PageLayout from '../components/Layouts/PageLayout/PageLayout'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { accountsSagaActions, accountsSelector } from '../redux/saga/accounts/slice/accountsSlice'
import SubscriptionsPageLayout from '../components/Layouts/SubscriptionsPageLayout/SubscriptionsPageLayout'
import SubscriptionsChannel from '../components/SubscriptionsPage/SubscriptionsChannelCard/SubscriptionsChannelCard'

export default function SubscriptionsPage() {
  const { id } = useParams()

  const account_subscriptions = useSelector(accountsSelector.getAccountSubscriptionsInfo)
  const dispatch = useDispatch()

  useEffect(() => {
    document.title = `Subscriptions`

    dispatch(accountsSagaActions.sagaGetAccountSubscriptions(id))
  }, [])

  return (
    <PageLayout>
      <SubscriptionsPageLayout>
        {account_subscriptions.length > 0 ? account_subscriptions.map((sub, index) => (
          <SubscriptionsChannel {...sub} key={index} />
        )) : <h1>This account has no subscriptions</h1>}
      </SubscriptionsPageLayout>
    </PageLayout>
  )
}
