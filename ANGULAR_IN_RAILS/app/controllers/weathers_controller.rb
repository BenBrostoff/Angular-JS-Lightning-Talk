class WeathersController < ApplicationController
  skip_before_filter  :verify_authenticity_token  

  def index
    current = Date.today
    Day.find_or_create_by(day_of: current)
  end

  def miles
    @miles = $client.activities_on_date("today")["summary"]["distances"][0]["distance"]
    @steps = $client.activities_on_date("today")["summary"]["steps"]
    Day.today.update(fitness: @steps)
    render json: {miles: @miles, steps: @steps}
  end

  def email 
    message = params["message"]
    $m_client.messages.send summary(message)
    Day.today.update(message: message)
    render json: {}
  end

  def summary(sum)
    {  
     :subject=> "#{Time.now} BROSTOFF OFFICIAL SUMMARY",  
     :text=> "#{sum}",  
     :to=>[  
       {  
         :email=> "ben.brostoff@gmail.com"  
       }  
     ],  
     :from_email=>"ben.brostoff@gmail.com"  
    }  
  end

  def code
    stats = $stats.today
    Day.today.update(code: stats)
    render json: {code: stats}
  end

  def history
    render json: {days: Day.limit(7)}
  end 

end
