import { connect } from "trilogy"
  const versionCheck = async () => {

  const db_ = connect('./HI_LUNA.db')
  const meta = await db_.model('meta', {
    version: Number,
    data: Object
  })
    let DBversion
  try { DBversion = (await meta.findOne()).version}
  catch {
    meta.create({ version: 1, data: {} })
    console.log("Prepared empty DB")
    return db_
  }

  switch (DBversion) {
  case 1:
    console.log("Loaded DB version 1")
  break
    default:
      console.error(`Loaded DB built in a newer release (release ${DBversion}) , please upgrade or remove database to continue.`)
      process.exit(1)
  }

  return db_
}

export const db = await versionCheck()


export const machines = await db.model('v1_machines', {
    uuid: { type: String, unique: true, primary: true },
    comm_key: String,
    hostname: String,
    friendly_name: String,
    tags: Array,
    authorized: Boolean
  })
export const machineData = await db.model('v1_machineData', {
    uuid: { type: String, primary: true, unique: true},
    xenia_release: Number,
    xenia_flavor: String,
    xenia_rootimg_hash: String,
    xenia_rootimg_timestamp: Date,
    local_ips: Array,
    dns_resolvers: Array
  }, {
    timestamps: true
  })
export const machinePer = await db.model('v1_machinePer', {
    uuid: { type: String, primary: true, unique: true},
    online: Boolean,
    dns_pingtime: Number, // -1 as failed
    uptime_min: Number,
    shutdown_reason: String,
    services_failed: Array,
    mount_usage: Object,
    extra: Object
  }, {
    timestamps: true
  })

