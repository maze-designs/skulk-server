import { db, machines, machineData } from "../../dbV1.mjs"
import { v4 as uuidv4, validate as uuid_validate } from 'uuid'
import package_json from '../../..//package.json' assert { type: 'json' }

const authByDefault = false // TODO: read env

const getMachines = async () => {
const machinesArr = await machines.find()

    if (machinesArr.length === 0) {
      return {}
    }

    machinesArr.forEach((_, i, array) => {
      delete array[i].comm_key

    })

  return machinesArr

}

async function router(fastify, options) {

  fastify.get('/', async (req, res) => {
    res.send(`fleet-server v${package_json.version}`) 
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
    while (await machines.findOneIn({"uuid": uuid}) != undefined
      && console.warn("uuid not unique; regenerating"))

    do {comm_key = uuidv4()}
    while (await machines.findOneIn({"comm_key": comm_key}) != undefined
      && console.warn("key not unique; regenerating"))

    const newMachine = {
      uuid: uuid,
      comm_key: comm_key,
      hostname: req.body.hostname.toString(),
      friendly_name: 'Fren :3', // TODO; allow set
      tags: [], // TODO: allow set, filter on /:GET
      authorized: authByDefault
    }

   // console.log(newMachine)

    await machines.create(newMachine)

    res.code(201).send(
      newMachine.comm_key
    )
  })

  fastify.post('/boot', async (req, res) => {
    try {
      const body = req.body.data
    }
    catch {
      res.code(400).send("Data property not present")
    }
    try {
      req.body.comm_key
    }
    catch {
      res.code(401).send("Missing comm_key")
    }
    
    // console.log(Object.keys(machineData.schema))
    
    const dataFields = [
    "xenia_release",
    "xenia_flavor",
    "xenia_rootimg_hash",
    "xenia_rootimg_timestamp",
    "local_ips",
    "dns_resolvers"
  ]
    const data = {}

    dataFields.forEach(field => {

      if (field === "local_ips" || field === "dns_resolvers") {
        try {
          body[field].length > 6 && (data[field] = body[field].toString().split(";"))
        } catch {}
      }
      else {

      try { data[field] = body[field].toString() }
      catch { console.log("missing/malformed field " + field); console.log(req)}
      }

      res.send()

    })
    

    
  })
}
export default router

