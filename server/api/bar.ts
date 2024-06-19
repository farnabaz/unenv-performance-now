import opentelemetry from '@opentelemetry/api'
export default eventHandler(async (event)  => {
  const foo = await $fetch('/api/foo')
  return foo + " Baaaaaar!"
})