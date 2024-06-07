import { useEffect } from "react";
import PageLayout from "../components/Layouts/PageLayout/PageLayout";
import SettingsPageLayout from "../components/Layouts/SettingsPageLayout/SettingsPageLayout";
import ChannelSettings from "../components/SettingsPage/ChannelSettings/ChannelSettings";
import SettingsSections from "../components/SettingsPage/SettingsSections/SettingsSections";
import AppSettings from "../components/SettingsPage/AppSettings/AppSettings";
import { useSelector } from "react-redux";
import { accountsSelector } from "../redux/saga/accounts/slice/accountsSlice";
import Button from "../components/Button/Button";
import { useNavigate } from "react-router-dom";

export default function SettingsPage() {
  useEffect(() => {
    document.title = "Settings";
  }, []);

  const logged_in = useSelector(accountsSelector.getLoggedIn);
  const buttonStyles = {
    paddingInline: 15,
    paddingBlock: 10,
    background: "green",
    color: "white"
  };

  const navigate = useNavigate();

  return (
    <PageLayout>
      <SettingsPageLayout>
        <SettingsSections title="Channel">
          {logged_in ? (
            <ChannelSettings />
          ) : (
            <Button
              onClick={() => navigate("/account/enter?type=login")}
              styles={buttonStyles}
            >
              Login
            </Button>
          )}
        </SettingsSections>
        <SettingsSections title="Settings">
          <AppSettings />
        </SettingsSections>
      </SettingsPageLayout>
    </PageLayout>
  );
}
