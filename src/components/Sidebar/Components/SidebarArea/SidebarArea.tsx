import "./SidebarArea.scss";

interface ISideBarAreaProps {
  title?: string;
  divisor?: boolean;
  children: any;
}

export default function SidebarArea({ title, divisor, children }: ISideBarAreaProps) {
  return (
    <div className="sidebar_area_container" style={!title ? {gap: 5} : {gap: 15}}>
      {divisor ? <div className="sidebar_area_container__divisor"></div> : null}
      <span className="sidebar_area_container__title">{title}</span>
      <div>{children}</div>
    </div>
  );
}
