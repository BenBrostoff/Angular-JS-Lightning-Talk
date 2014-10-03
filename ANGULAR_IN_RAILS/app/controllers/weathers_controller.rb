class WeathersController < ApplicationController

  def index
    p $client.activities_on_date("today")["summary"]
  end

  def miles
    @miles = $client.activities_on_date("today")["summary"]["distances"][0]["distance"]
    @steps = $client.activities_on_date("today")["summary"]["steps"]
    render json: {miles: @miles, steps: @steps}
  end

end
