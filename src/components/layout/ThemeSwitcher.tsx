'use client'

import { useState } from "react";
import { MoonSolidIcon, SunSharpSolidIcon } from "../svgs/icons";
import styles from '@/styles/modules/HeaderNavigation.module.css'
import { getCookie, setCookie } from "cookies-next";

export default function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState(getCookie('theme') || 'dark')
  
  function changeTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme')
    const theme = currentTheme === 'dark' ? 'light' : 'dark'
    document.documentElement.setAttribute('data-theme', theme)
    setCookie('theme', theme, { path: '/' })
    setCurrentTheme(theme)
  }
  
  return (
    <button type="button" onClick={changeTheme} className={styles.theme}>
      {currentTheme === "dark" ? (
        <SunSharpSolidIcon />
      ) : (
        <MoonSolidIcon />
      )}
    </button>
  )
}