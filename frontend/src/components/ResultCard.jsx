import { useEffect, useState } from 'react'
import styles from './ResultCard.module.css'

function ResultCard({ shortUrl, originalUrl }) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return

    const timeoutId = setTimeout(() => {
      setCopied(false)
    }, 1600)

    return () => clearTimeout(timeoutId)
  }, [copied])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl)
      setCopied(true)
    } catch {
      // ignore clipboard errors in case permissions are blocked
    }
  }

  if (!shortUrl) {
    return null
  }

  return (
    <div className={styles.card}>
      <p className={styles.label}>Short link</p>

      <div className={styles.shortRow}>
        <div className={styles.shortUrl} title={shortUrl}>
          <a
            className={styles.shortUrlLink}
            href={shortUrl}
            target="_blank"
            rel="noreferrer"
          >
            {shortUrl}
          </a>
        </div>
        <button
          type="button"
          className={`${styles.copyButton} ${copied ? styles.copyButtonCopied : ''}`}
          onClick={handleCopy}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      {originalUrl && (
        <p className={styles.meta}>
          Original:{' '}
          <span className={styles.originalUrl} title={originalUrl}>
            {originalUrl}
          </span>
        </p>
      )}
    </div>
  )
}

export default ResultCard

