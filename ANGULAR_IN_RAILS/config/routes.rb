Rails.application.routes.draw do
  root 'weathers#index'
  get '/miles', to: 'weathers#miles'
  post '/email', to: 'weathers#email'
  post '/book', to: 'weathers#book'
  get '/code', to: 'weathers#code'
  get '/history', to: 'weathers#history'
end
