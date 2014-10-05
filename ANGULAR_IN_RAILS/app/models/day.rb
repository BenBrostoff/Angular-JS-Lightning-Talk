class Day < ActiveRecord::Base

  def self.today
    find_by(day_of: Date.today)
  end

  def code_fill(req)
    return "code_req" if self.code > req
  end

  def fitness_fill(req)
    return "fit_req" if self.fitness > req 
  end

end
