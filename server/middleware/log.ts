export default defineEventHandler((event) => {
  const start = Date.now()

  const req = event.node.req
  const res = event.node.res

  const url = req.url
  const method = req.method

  const headers = req.headers
  const ip = headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown'

  const userAgent = headers['user-agent'] || ''
  const contentLength = headers['content-length'] || null

  const requestId
    = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`

  // --- REQUEST --------------------------------------------------------------
  console.log(
    JSON.stringify({
      type: 'request',
      requestId,
      method,
      url,
      ip,
      userAgent,
      contentLength,
      timestamp: new Date().toISOString()
    })
  )

  // --- ABORTED --------------------------------------------------------------
  res.on('close', () => {
    if (!res.writableEnded) {
      console.warn(
        JSON.stringify({
          type: 'aborted',
          requestId,
          method,
          url,
          ip,
          duration: Date.now() - start,
          timestamp: new Date().toISOString()
        })
      )
    }
  })

  // --- RESPONSE -------------------------------------------------------------
  res.on('finish', () => {
    const duration = Date.now() - start

    console.log(
      JSON.stringify({
        type: 'response',
        requestId,
        method,
        url,
        status: res.statusCode,
        duration,
        timestamp: new Date().toISOString()
      })
    )
  })
})
