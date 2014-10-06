task :update => :environment do 
  WEEK_STATS.each do |k,v|
    Day.find_or_create_by(day_of: k).update(code: v)
  end

  week = CLIENT.data_by_time_range('/activities/tracker/steps', {:base_date => Date.today, :period => '7d'} )
  week["activities-tracker-steps"].each do |pair|
    Day.find_or_create_by(day_of: pair["dateTime"]).update(fitness: pair["value"])
  end
end