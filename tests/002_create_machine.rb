require('./_INCLUDE_THIS.rb')
require('./_test_machine.rb')

passed=true

resArr = []
TM.each { |m|
  res=`http post #{IP_ADDRESS}/api/v1/machine/register hostname=#{m["hostname"]} -j`
puts res
resArr.append(res)

passed = passed && (res =~ /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/)
}

File.write("machine_keys.temp", resArr.join("\n")) and puts "keys written into ./machine_keys.temp"

test_result('create machine', passed)

# res=`http #{IP_ADDRESS}/api/v1`
# 
# if res.include? 'API v1 root'
#   passed = true
# end
# 
# test_result('API v1 ping', passed)
# 
