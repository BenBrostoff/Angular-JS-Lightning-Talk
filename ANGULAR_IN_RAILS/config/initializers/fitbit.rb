key_a = ENV["FITBIT_CONSUMER_KEY"]
key_b = ENV["FITBIT_CONSUMER_SECRET"]
key_c = ENV["OAUTH_TOKEN"]
key_d = ENV["OAUTH_SECRET"]

$client = Fitgem::Client.new ({ :consumer_key => key_a, 
                                :consumer_secret => key_b,
                                :token => key_c,
                                :secret => key_d })
