import machines  from "./apiV1/machines.mjs"

async function router (fastify, options) {

  fastify.register(machines, { prefix: '/machines'})

  fastify.get('/', (req, res) => {
    res.send('API v1 root')
  })
  

}
export default router
