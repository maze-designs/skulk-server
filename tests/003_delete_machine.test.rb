require('./_INCLUDE_THIS.rb')
require('./_test_machine.rb')
require 'json'

passed=false
# TEST: fetch machines

res = `http #{IP_ADDRESS}/v1/machines`

begin
  res.length > 10 || throw
  machines = JSON.parse(res)
rescue
  puts "Cannot parse response"
  passed=false
else
  passed=true
end

test_result('fetch machines', passed)

# TEST: delete machine

machine_to_delete = machines[-1]["uuid"]
print "Attempting to delete ", machine_to_delete, " (@#{machines[-1]["hostname"]})\n"

res = `http delete #{IP_ADDRESS}/v1/machines machineUUID=#{machine_to_delete} -j`

res = `http #{IP_ADDRESS}/v1/machines`
machinesAfter = JSON.parse(res)

passed = (machinesAfter[-1]["uuid"] != machine_to_delete)

test_result('delete machine', passed)

