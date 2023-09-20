require('./_INCLUDE_THIS.rb')
require('./_test_machine.rb')

passed=false

res=`http post #{IP_ADDRESS}/api/v1/machine/register hostname=#{TM_HOSTNAME} -j`
puts res
if res =~ /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/
  passed = true
end

test_result('create machine', passed)

# res=`http #{IP_ADDRESS}/api/v1`
# 
# if res.include? 'API v1 root'
#   passed = true
# end
# 
# test_result('API v1 ping', passed)
# 
