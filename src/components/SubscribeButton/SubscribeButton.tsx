import { useSelector, useDispatch } from "react-redux";
import { messageBoxActions } from "../../redux/features/messageBox";
import { accountsSelector } from "../../redux/saga/accounts/slice/accountsSlice";
import { channelsSagaActions } from "../../redux/saga/channels/slice/channelsSlice";
import Button from "../Button/Button";
import { IChannel } from "../../../models/Channels";
import { useNavigate } from "react-router-dom";

interface ISubscribeButtonProps {
  setting: string;
  channel: IChannel;
  onClickSetting: () => void;
}

export default function SubscribeButton({
  setting,
  channel,
  onClickSetting
}: ISubscribeButtonProps) {
  const logged_in_account = useSelector(accountsSelector.getLoggedAccountInfo);
  const logged_in = useSelector(accountsSelector.getLoggedIn)
  const dispatch = useDispatch();

  const navigate = useNavigate()

  return (
    <div>
      {logged_in_account?.user?.subscribed_to?.includes(channel?.id) ? (
        <Button
          className="video_owner_channel_banner_container__subscribed_button"
          onClick={() =>
            dispatch(
              messageBoxActions.setMessageBoxState({
                message: `Do you want to unsubscribe from "${channel?.name}"?`,
                onClick: () =>
                  dispatch(
                    channelsSagaActions.sagaUnSubscribeFromChannel(
                      {
                        account_id: logged_in_account?.user?.channel?.id,
                        channel_id: channel?.id
                      },
                      (data) => {
                        if (data.status === 204) {
                          window.location.reload();
                        }
                      },
                      () => {}
                    )
                  ),
                opened: true
              })
            )
          }
        >
          Subscribed
        </Button>
      ) : !logged_in_account?.user?.subscribed_to?.includes(channel?.id) &&
        logged_in_account?.user?.channel?.id !== channel?.id ? (
        <Button
          className="video_owner_channel_banner_container__subscribe_button"
          onClick={() => {
            if (logged_in) {
              dispatch(
                channelsSagaActions.sagaSubscribeToChannel(
                  {
                    account_id: logged_in_account?.user?.channel?.id,
                    channel_id: channel?.id
                  },
                  (data) => {
                    if (data.status === 204) {
                      window.location.reload();
                    }
                  },
                  () => {}
                )
              )
            } else {
              navigate('/account/enter')
            }
          }}
        >
          Subscribe
        </Button>
      ) : (
        <Button
          className="video_owner_channel_banner_container__modify_button"
          onClick={onClickSetting}
        >
          {setting}
        </Button>
      )}
    </div>
  );
}
