import { db, machine } from "../../dbV1.mjs"
import { v4 as uuidv4, validate as uuid_validate } from 'uuid';

const authByDefault = false // TODO: read env

const getMachines = async () => {
const machines = await machine.find()

    if (machines.length === 0) {
      return {}
    }

    machines.forEach((_, i, array) => {
      delete array[i].comm_key

    })

  return machines

}

async function router(fastify, options) {

  fastify.get('/', async (req, res) => {
        res.send(await getMachines())
  })


  fastify.post('/', async (req, res) => {

    // NOTE: Does *not* respond with JSON

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
    do {uuid = uuidv4()}
    while (await machine.findOneIn({"uuid": uuid}) != undefined
      && console.warn("uuid not unique; regenerating"))

    do {comm_key = uuidv4()}
    while (await machine.findOneIn({"comm_key": comm_key}) != undefined
      && console.warn("key not unique; regenerating"))

    const newMachine = {
      uuid: uuid,
      comm_key: comm_key,
      hostname: req.body.hostname,
      friendly_name: '',
      authorized: authByDefault
    }

   // console.log(newMachine)

    await machine.create(newMachine)

    res.code(201).send(
      newMachine.comm_key
    )
  })

  fastify.delete('/', async (req, res) => {
    try {
      req.body.machineUUID
    }
    catch {
      res.code(400).send(
        "Specify machineUUID property"
      )
      return
    }
    
    if (!uuid_validate(req.body.machineUUID)) {
      res.code(400).send(
        "Malformed machineUUID"
      )
      return
    }

    if (await machine.findOneIn({"uuid": req.body.machineUUID}) == undefined) {
      res.code(404).send(
        "Machine not found"
      )
      return
    }
    machine.remove({ uuid: req.body.machineUUID })
    res.send(await getMachines())

  })


}
export default router
