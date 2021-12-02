Rails.application.routes.draw do
  resources :products
  resources :sales
  get 'app', to: 'products#index'
  get 'app', to: 'sales#index'
  root to: 'index#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
