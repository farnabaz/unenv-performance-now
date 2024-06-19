import opentelemetry from '@opentelemetry/api'
import { BasicTracerProvider } from '@opentelemetry/sdk-trace-web'

export default defineNitroPlugin(async (nitroApp) => {
  const _handler = nitroApp.h3App.handler
  let provider: BasicTracerProvider
  nitroApp.h3App.handler = async function (event) {
    if (!provider) {
      provider = new BasicTracerProvider()
      provider.register()
    }
    return opentelemetry.trace.getTracer('nuxthub').startActiveSpan(`${event.node.req.method} ${event.node.req.url}`, async (span) => {
      try {
      return await  _handler(event)
      } catch (err: any) {
        span.setStatus({ code: err.code || 'UNKNOWN', message: err.message })
        throw err
      } finally {
        span.end()
      }
    })
  }
})
