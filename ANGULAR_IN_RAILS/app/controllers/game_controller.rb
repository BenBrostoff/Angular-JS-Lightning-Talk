class GameController < ApplicationController
  skip_before_filter  :verify_authenticity_token 

  def game
  end

  def log_score 
    p params["score"]
    render json: {}
  end

end
