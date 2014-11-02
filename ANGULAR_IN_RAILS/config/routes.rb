Rails.application.routes.draw do
  root 'weathers#index'
  get '/miles', to: 'weathers#miles'
  get '/code', to: 'weathers#code'
  get '/history', to: 'weathers#history'
  get '/book_history', to: 'weathers#book_history'

  post '/email', to: 'weathers#email'
  post '/book', to: 'weathers#book'

  get '/game', to: 'game#game'
  post '/log_score', to: 'game#log_score'
end
