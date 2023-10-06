require('./_INCLUDE_THIS.rb')
require('./_test_machine.rb')
require 'json'

passed=false


comm_key=File.read("./machine_keys.temp")
comm_key=comm_key.split("\n")[0]
# http post :23313/v1/agents/boot comm_key=sus d:='{"xenia_release":"0.4", "local_ips": "8.8.8.8;3.3.3.3"}' -j

json="{\"xenia_release\":\"0.4\",\"xenia_flavor\":\"uhhh chocolate\",\"xenia_rootimg_hash\":\"89bcd5725249c1648e9aee29a6a9b8730158177e48b1bc581bef0ed805373faf\",\"xenia_rootimg_timestamp\":\"tomorrow i thinks\",\"dns_resolvers\":\"69.420.666.727;69.69.69.69\",\"local_ips\":\"10.0.0.69\"}"


res = `http post #{IP_ADDRESS}/v1/agents/boot comm_key=#{comm_key} data:='#{json}'`
puts res
