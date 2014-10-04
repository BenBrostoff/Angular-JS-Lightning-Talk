Rails.application.routes.draw do
  root 'weathers#index'
  get '/miles', to: 'weathers#miles'
  post '/email', to: 'weathers#email'
  get '/code', to: 'weathers#code'
end
