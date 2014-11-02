class GameController < ApplicationController
  skip_before_filter  :verify_authenticity_token 

  def game
    @scores = Score.aggregate
    @total = Score.count
    p @total
  end

  def log_score 
    Score.create(tally: params["score"])
    render json: {}
  end

end
