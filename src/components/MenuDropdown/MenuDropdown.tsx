import "./MenuDropdown.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { useEffect, useRef } from "react";

interface IOption {
  label: string;
  icon: IconProp;
  onClick: () => void;
}

interface IMenuDropdownProps {
  title?: string;
  options: IOption[];
  className?: string;
  onClose?: () => void;
}

export default function MenuDropdown({ ...props }: IMenuDropdownProps) {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    document.addEventListener("click", (e: any) => {
      if (ref.current && !ref.current.contains(e.target)) {
        props.onClose && props.onClose()
      }
    }, true)
  }, [])

  return (
    <div ref={ref} className={`menu_dropdown_container ${props.className}`} >
      {props.title && <span className="menu_dropdown_container__title">{props.title}</span>}
      <div className="menu_dropdown_container__options_container">
        {props.options.map((option, index) => (
          <div onClick={option.onClick} key={index} className="menu_dropdown_container__options_container__option">
            <span className="menu_dropdown_container__options_container__option_container__label">{option.label}</span>
            <FontAwesomeIcon size="sm" icon={option.icon} />
          </div>
        ))}
      </div>
    </div>
  );
}
