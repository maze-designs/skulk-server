import machine  from "./apiV1/machine.mjs"

async function router (fastify, options) {

  fastify.register(machine, { prefix: '/machine'})

  fastify.get('/', (req, res) => {
    res.send('API v1 root')
  })
  

}
export default router
