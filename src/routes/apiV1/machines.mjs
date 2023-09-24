import { db, machines } from "../../dbV1.mjs"
import { v4 as uuidv4, validate as uuid_validate } from 'uuid';

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
        res.send(await getMachines())
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

    if (await machines.findOne({"uuid": req.body.machineUUID}) == undefined) {
      res.code(404).send(
        "Machine not found"
      )
      return
    }
    machines.remove({ uuid: req.body.machineUUID })
    res.send(await getMachines())

  })


}
export default router
