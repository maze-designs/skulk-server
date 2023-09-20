  RED = "\e[31m"
  GREEN = "\e[32m"
  YELLOW = "\e[33m"
  ENDCOLOR = "\e[0m"

def test_result (test_name, passed=true, fail_detail="", fatal=true) 
  puts "[#{passed ? GREEN : RED}#{passed ? "PASSED" : "FAILED"}#{ENDCOLOR}] #{test_name}"
  !passed && fail_detail.length != 0 && ( puts "#{YELLOW}#{fail_detail}#{ENDCOLOR}" )
  !passed && ( fatal ? ( puts "Fatal - Terminating test" and exit 2 ) : ( puts "Non-fatal - Continuing" ))
end

if __FILE__ == $0
 test_result("This test passes")
 test_result("This test fails", false, "Because i said so", true)
end


