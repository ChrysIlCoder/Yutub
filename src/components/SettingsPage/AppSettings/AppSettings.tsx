import './AppSettings.scss'

export default function AppSettings() {
  const selected_theme: any = window.localStorage.getItem("nightowl-color-scheme")
  
  const changeThemeColor = (theme: string) => {
    window.localStorage.setItem("nightowl-color-scheme", theme)
    window.location.reload()
  }

  return (
    <div className='app_settings_container'>
      <label htmlFor="">Theme:</label>
      <select className='app_settings_container__selector' value={selected_theme} onChange={(e: any) => changeThemeColor(e.target.value)} name="Theme color" id="">
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      <span className='app_settings_container__warning'>* May bug</span>
    </div>
  )
}
