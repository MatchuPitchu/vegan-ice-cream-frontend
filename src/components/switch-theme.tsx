import { useThemeContext } from '../context/theme-context'

import classes from './switch-theme.module.css'

export const SwitchTheme = () => {
  const { isDarkTheme, handleTheme } = useThemeContext()

  return (
    <button
      onClick={handleTheme}
      className={`${classes.switch} ${isDarkTheme ? classes.night : ''}`}
      aria-label="toggle dark light mode"
    >
      <div className={classes.moon}>
        <div className={classes.crater} />
        <div className={classes.crater} />
      </div>
      <div>
        <div className={`${classes.shape} ${classes.sm}`} />
        <div className={`${classes.shape} ${classes.sm}`} />
        <div className={`${classes.shape} ${classes.md}`} />
        <div className={`${classes.shape} ${classes.lg}`} />
      </div>
    </button>
  )
}
