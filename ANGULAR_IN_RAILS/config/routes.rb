Rails.application.routes.draw do
  root 'weathers#index'
  get '/miles', to: 'weathers#miles'
end
