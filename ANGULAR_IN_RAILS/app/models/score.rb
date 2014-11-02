class Score < ActiveRecord::Base

  def self.aggregate
    hold = {}
    max = self.all.order("tally DESC").first.tally
    (2.. max).to_a.each do |score|
      count = 0
      all.each do |entry|
        if entry.tally == score
          count += 1
          hold[score] = count
        end
      end
    end
    return hold.sort_by{ |k,v| -k }
  end

end
