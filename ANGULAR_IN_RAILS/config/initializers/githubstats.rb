HOLD = {}
STATS = GithubStats.new('benbrostoff')
WEEK_STATS = STATS.data.to_h.sort_by { |k, v| k.to_s }.reverse.take(7)

WEEK_STATS.each do |item|
  HOLD[item[0].to_s] = item[1]
end


