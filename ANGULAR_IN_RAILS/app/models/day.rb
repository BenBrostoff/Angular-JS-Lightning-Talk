class Day < ActiveRecord::Base

  has_many :books

  def self.today
    find_by(day_of: Date.today)
  end

  def gen_fill(req, class_name, index, method)
    m = method(method)
    return "none" if !m.call
    return class_name if m.call > req && index != 0 
  end

  def time_reading
    time = 0
    books.each {|book| time += book.time_reading}
    return time 
  end

end
