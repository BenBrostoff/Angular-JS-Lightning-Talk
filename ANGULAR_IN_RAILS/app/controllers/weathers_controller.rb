class WeathersController < ApplicationController
  skip_before_filter  :verify_authenticity_token  

  def index
    Day.first_or_create(day_of: Date.today)
  end

  def miles
    @miles = $client.activities_on_date("today")["summary"]["distances"][0]["distance"]
    @steps = $client.activities_on_date("today")["summary"]["steps"]
    Day.find_by(day_of: Date.today).update(fitness: @steps)
    render json: {miles: @miles, steps: @steps}
  end

  def email 
    message = params["message"]
    $m_client.messages.send summary(message)
    Day.find_by(day_of: Date.today).update(message: message)
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
    render json: {code: stats}
  end

end
