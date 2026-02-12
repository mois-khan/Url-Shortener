import { useState } from 'react'
import styles from './UrlForm.module.css'

function UrlForm({ onShorten, loading, error }) {
  const [value, setValue] = useState('')
  const [localError, setLocalError] = useState(null)

  const handleSubmit = async (event) => {
    event.preventDefault()

    let input = value.trim()
    if (!input) {
      setLocalError('Please paste a URL to shorten.')
      return
    }

    // Basic URL-like check
    if (!input.includes('.')) {
      setLocalError("That doesn't look like a valid URL.")
      return
    }

    // Normalize: strip protocol for backend which prefixes https://
    if (input.toLowerCase().startsWith('https://')) {
      input = input.slice('https://'.length)
    } else if (input.toLowerCase().startsWith('http://')) {
      input = input.slice('http://'.length)
    }

    setLocalError(null)
    await onShorten(input)
  }

  const showError = localError || error
  const isDisabled = loading

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.labelGroup}>
        <label className={styles.label} htmlFor="url-input">
          Long URL
        </label>
        <p className={styles.hint}>Paste the link you want to shorten.</p>
      </div>

      <div className={styles.inputRow}>
        <div className={styles.inputWrapper}>
          <input
            id="url-input"
            className={`${styles.input} ${showError ? styles.inputError : ''}`}
            type="text"
            inputMode="url"
            autoComplete="off"
            placeholder="example.com/very/long/link"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            disabled={isDisabled}
          />
        </div>
        <button
          type="submit"
          className={styles.button}
          disabled={isDisabled}
        >
          {loading ? 'Shortening…' : 'Shorten'}
        </button>
      </div>

      <p className={styles.helper}>
        <span className={styles.helperStrong}>Tip:</span> You can paste URLs
        with or without <code>https://</code> — we&apos;ll handle it for you.
      </p>

      {showError && <p className={styles.error}>{showError}</p>}
    </form>
  )
}

export default UrlForm

