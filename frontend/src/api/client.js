const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001'

export { BASE_URL }

export async function createShortUrl(redirectUrl) {
  const response = await fetch(`${BASE_URL}/short-url`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ redirectUrl }),
  })

  if (!response.ok) {
    let message = 'Unable to shorten URL. Please try again.'

    try {
      const data = await response.json()
      if (data?.message) {
        message = data.message
      }
    } catch {
      // ignore JSON parsing errors and use default message
    }

    throw new Error(message)
  }

  return response.json()
}

