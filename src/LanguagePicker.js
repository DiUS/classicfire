import React from 'react'
import styles from './LanguagePicker.module.css'

const LanguagePicker = ({ language, onSelectLanguage }) => (
  <div className={styles.wrapper}>
    <h1>Select Language</h1>
    <select value={language} onChange={(e) => onSelectLanguage(e.target.value)}>
      <option value="en-AU">English</option>
      <option value="es-ES">Spanish</option>
      <option value="ru-RU">Russian</option>
    </select>
  </div>
)


export default LanguagePicker
