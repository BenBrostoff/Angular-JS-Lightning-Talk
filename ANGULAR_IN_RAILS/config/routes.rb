Rails.application.routes.draw do
  root 'weathers#index'
  get '/game', to: 'game#game'
  
  get '/miles', to: 'weathers#miles'
  get '/code', to: 'weathers#code'
  get '/history', to: 'weathers#history'
  get '/book_history', to: 'weathers#book_history'

  post '/email', to: 'weathers#email'
  post '/book', to: 'weathers#book'
end
