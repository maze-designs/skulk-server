# Make sure there are at least two machines; last one will be deleted
# Unless at least one remains after, tests will fail

TM=[
  {
    "hostname" => "hi"
  },
  {
    "hostname" => "luna"
  },
  {
    "hostname" => "brrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr"
  },
]
