import { CSSProperties, ChangeEvent } from "react";
import "./Button.scss";

interface IButtonProps {
  onClick?: (e: ChangeEvent<HTMLButtonElement>) => void;
  children: any;
  styles?: CSSProperties;
  className?: string;
  disabled?: boolean;
}

export default function Button({ ...props }: IButtonProps) {
  return (
    <button
    //@ts-ignore
      onClick={(e) => {props.onClick(e)}}
      style={{ ...props.styles }}
      className={!props.disabled ? `button ${props.className}` : `button__disabled ${props.className}`}
    >
      {props.children}
    </button>
  );
}
