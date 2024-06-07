import { useDispatch, useSelector } from 'react-redux'
import { navbarSelector } from '../../../redux/features/navbar/navbarSlice'
import Navbar from '../../Navbar/Navbar'
import Sidebar from '../../Sidebar/Sidebar'
import './PageLayout.scss'
import { navbarActions } from '../../../redux/features/navbar'

interface IPageLayoutProps {
  children: any;
  no_sidebar?: boolean;
}

export default function PageLayout({ children, no_sidebar }: IPageLayoutProps) {
  const sidebar_opened = useSelector(navbarSelector.getSidebarState)

  const dispatch = useDispatch()

  if (no_sidebar) {
    dispatch(navbarActions.setOpenSidebar(false))
  }

  return (
    <div className='page_layout_container' style={!sidebar_opened ? { gridTemplateColumns: '1fr' } : { gridTemplateColumns: 'auto 3fr' }}>
      <Navbar disabled_sidebar={no_sidebar} />
      {sidebar_opened ? <Sidebar /> : null}
      {children}
    </div>
  )
}
