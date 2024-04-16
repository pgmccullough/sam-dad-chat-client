require 'rack/rewrite'

use Rack::Rewrite do
  r301 %r{.*}, 'https://www.sammychat.com$&', if: Proc.new {|rack_env|
    rack_env['SERVER_NAME'] == 'sammychat.com'
  }
end