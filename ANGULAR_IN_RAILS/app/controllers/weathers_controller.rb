class WeathersController < ApplicationController

  def index
  end

  def miles
    @miles = $client.activities_on_date("today")["summary"]["distances"][0]["distance"]
    @steps = $client.activities_on_date("today")["summary"]["steps"]
    render json: {miles: @miles, steps: @steps}
  end

  def email 
    p params
    $m_client.messages.send summary("HOLDER")
    render json: {}
  end

  def summary(sum)
    {  
     :subject=> "#{Time.now} Summary",  
     :text=> "#{sum}",  
     :to=>[  
       {  
         :email=> "ben.brostoff@gmail.com"  
       }  
     ],  
     :from_email=>"ben.brostoff@gmail.com"  
    }  
  end

end
