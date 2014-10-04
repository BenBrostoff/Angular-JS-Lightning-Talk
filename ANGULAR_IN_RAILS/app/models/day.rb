class Day < ActiveRecord::Base

  def self.today
    find_by(day_of: Date.today)
  end

end
