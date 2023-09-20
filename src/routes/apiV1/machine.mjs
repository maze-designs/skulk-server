import { db, machine } from "../../dbV1.mjs"
import { v4 as uuidv4 } from 'uuid';

const authByDefault = false // TODO: read env

async function router (fastify, options) {

  fastify.get('/', async (req, res) => {

    const machines = await machine.find()

    if (machines.length === 0) {
      res.send({})
      return
    }

    machines.forEach((_, i, array) => {
      delete array[i].comm_key

    })
    res.send(machines)
  })


  fastify.post('/register', async (req, res) => {

  try {
    req.body.hostname
  }
  catch
    {
      res.code(400).send(
        "Hostname not supplied"
      )
      return
    }

    let uuid, comm_key;

    // check if uuids unique
    do {uuid = uuidv4(); console.warn("uuid not unique; regenerating")}
    while (await machine.findOne( {"uuid": uuid} ) != undefined)

    do {comm_key = uuidv4();  console.warn("key not unique; regenerating")}
    while (await machine.findOneIn( {"comm_key": comm_key} ) != undefined) 

  const newMachine = {
      uuid: uuid, 
      comm_key: comm_key,
      hostname: req.body.hostname,
      friendly_name: '',
      authorized: authByDefault
    }

    console.log(newMachine)

    await machine.create(newMachine)

  res.code(201).send(
    JSON.stringify({
      comm_key: newMachine.comm_key
    }) 
  )
  })
  

}
export default router
