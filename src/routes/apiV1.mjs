import machines  from "./apiV1/machines.mjs"
import agents from "./apiV1/agents.mjs"

async function router (fastify, options) {

  fastify.register(machines, { prefix: '/machines'})
  fastify.register(agents, { prefix: '/agents'})

  fastify.get('/', (req, res) => {
    res.send('API v1 root')
  })
  

}
export default router
