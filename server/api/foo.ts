import opentelemetry from '@opentelemetry/api'
export default eventHandler(async (event)  => {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  return "Fooooo"
})