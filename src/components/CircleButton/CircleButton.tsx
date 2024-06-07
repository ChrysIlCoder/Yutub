import { useState } from 'react';
import './CircleButton.scss'

interface ICircleButtonProps {
    background?: boolean;
    label?: string;
    children: any;
    onClick?: () => void;
}

export default function CircleButton({ children, label, onClick }: ICircleButtonProps) {
  const [showName, setShowName] = useState(false)

  const Name = ({name}: any) => {
    return (
      <div className='circle_button_container__label_tooltip'>
        <p>{name}</p>
      </div>
    )
  }

  return (
    <>
      <button onClick={onClick} onMouseEnter={() => setShowName(true)} onMouseLeave={() => setShowName(false)} className='circle_button_container'>
        {children}
        {showName ? <Name name={label} /> : null}
      </button>
    </>
  )
}
