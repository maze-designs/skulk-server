import Fastify from 'fastify'

import apiv1 from './routes/apiV1.mjs'

const fastify = Fastify({
  logger: {
      transport: {
      target: 'pino-pretty'
    }
  }
})

fastify.register(apiv1, {prefix: '/v1'})

fastify.route({
  method: 'GET',
  url: '/',
  handler: function (request, reply) {
    reply.send('xenia-fleet-server root')
  }}
)


try {
  await fastify.listen({ port: 23313 })
} catch (err) {
  fastify.log.error(err)
  process.exit(1)
}
