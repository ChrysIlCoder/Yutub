import "./SettingsSections.scss";

interface ISettingsSectionsProps {
  title: string;
  children: any;
}

export default function AppSettings({ ...props }: ISettingsSectionsProps) {
  return (
    <div className="settings_section_container">
      <div className="settings_section_container__title_container">
        <h1 className="settings_section_container__title_container__title">{props.title}</h1>
        <div className="settings_section_container__title_container__line"></div>
      </div>
      <div className="settings_section_container__setting">
        {props.children}
      </div>
    </div>
  );
}
