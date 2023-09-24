require('./_INCLUDE_THIS.rb')
require('./_test_machine.rb')

passed=false
# TEST: create machine
machine_keys = []
TM.each { |m|
  res=`http post #{IP_ADDRESS}/v1/agents hostname=#{m["hostname"]} -j`
print res, " : "
machine_keys.append(res)

passed = (res =~ /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/)
}

File.write("machine_keys.temp", machine_keys.join("\n")) and puts "(keys written into ./machine_keys.temp)"

test_result('create machine', passed)

# TEST: Validate created machines
passed = false
res = `http #{IP_ADDRESS}/v1/machines`
#puts res
TM.each { |m|
  passed = res.include? m["hostname"]
  passed || puts("failed on ", m["hostname"]) && break
}

# NOTE: Register query returns communication key which machine listing doesn't include;
# this would fail:

# passed && machine_keys.each { |mk|
#   passed = res.include? mk
#   passed || break
# }

test_result('validate machine', passed)
