import { db, machine } from "../../dbV1.mjs"
import { v4 as uuidv4 } from 'uuid';

const authByDefault = false // TODO: read env

async function router(fastify, options) {

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
    while (await machine.findOne({"uuid": uuid}) != undefined
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

    console.log(newMachine)

    await machine.create(newMachine)

    res.code(201).send(
      newMachine.comm_key
    )
  })
  fastify.delete('/', (req, res) => {
    try {
      req.body.machineUUID
    }
    catch {
      res.code(400).send(
        "Specify machineUUID property"
      )
    }

  })


}
export default router
