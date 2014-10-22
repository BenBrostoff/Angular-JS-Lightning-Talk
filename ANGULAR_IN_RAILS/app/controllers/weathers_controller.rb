class WeathersController < ApplicationController
  skip_before_filter  :verify_authenticity_token  

  def index   
    current = Date.today
    Day.find_or_create_by(day_of: current)
    @trailing = Day.order("day_of DESC").limit(7).reverse
  end

  def miles
    @miles = CLIENT.activities_on_date("today")["summary"]["distances"][0]["distance"]
    @steps = CLIENT.activities_on_date("today")["summary"]["steps"]
    Day.today.update(fitness: @steps)
    render json: { miles: @miles, steps: @steps }
  end

  def email 
    message = params["message"]
    MCLIENT.messages.send summary(message)
    Day.today.update(message: message)
    render json: {}
  end

  def book
    p params
    p params["title"]
    author, title, time = params["author"], params["title"], params["time"]
    Day.today.books << Book.create(author: author, title: title, time_reading: time)
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
    stats = STATS.today
    Day.today.update(code: stats)
    render json: { code: stats }
  end

  def history
    render json: { days: Day.all }
  end 

end
