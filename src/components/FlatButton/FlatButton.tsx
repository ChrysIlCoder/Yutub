import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { COLORS } from '../../constants/styles/COLORS'

import './FlatButton.scss'
import { CSSProperties } from 'react';

interface IFlatButtonProps {
  onClick?: () => void
  label: string
  active?: boolean;
  icon?: any;
  disabled?: boolean;
}

export default function FlatButton({ ...props }: IFlatButtonProps) {
  const active_style: CSSProperties = {
    background: COLORS.porcelian
  }

  const disabled_styles: CSSProperties = {
    opacity: 0.5,
    cursor: 'not-allowed',
    pointerEvents: 'none',
  }

  return (
    <button disabled={props.disabled} style={props.active ? active_style : props.disabled ? disabled_styles : undefined} className='flat_button_container' onClick={props.onClick}>
        <FontAwesomeIcon size='lg' icon={props.icon} />
        <span style={props.active ? {fontWeight: 600} : {fontWeight: 400}} className='flat_button_container__label'>{props.label}</span>
    </button>
  )
}
