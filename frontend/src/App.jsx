import { useState } from 'react'
import styles from './App.module.css'
import UrlForm from './components/UrlForm.jsx'
import ResultCard from './components/ResultCard.jsx'
import { BASE_URL, createShortUrl } from './api/client.js'

function App() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleShorten = async (redirectUrl) => {
    try {
      setError(null)
      setLoading(true)

      const data = await createShortUrl(redirectUrl)
      const shortUrl = `${BASE_URL}/${data.shortId}`

      setResult({
        shortUrl,
        redirectUrl: data.redirectUrl,
      })
    } catch (err) {
      setResult(null)
      setError(err.message || 'Something went wrong while shortening the URL.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.app}>
      <main className={styles.main}>
        <section className={styles.card}>
          <header className={styles.header}>
            <h1 className={styles.title}>URL Shortener</h1>
            <p className={styles.subtitle}>
              Turn long links into clean, shareable URLs in a single click.
            </p>
          </header>

          <section className={styles.section}>
            <p className={styles.sectionLabel}>Paste your link</p>
            <UrlForm onShorten={handleShorten} loading={loading} error={error} />
          </section>

          {result && (
            <section className={styles.section}>
              <p className={styles.sectionLabel}>Your short link</p>
              <ResultCard
                shortUrl={result.shortUrl}
                originalUrl={result.redirectUrl}
              />
            </section>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
