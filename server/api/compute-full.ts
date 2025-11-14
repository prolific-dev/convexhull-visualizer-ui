export default defineEventHandler(async () => {
  const res = await fetch('http://localhost:8080/api/v1/compute')
  const data = await res.json()
  return data
})
