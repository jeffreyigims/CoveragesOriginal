Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :coverages
  resources :sports
  resources :leagues
  resources :clubs
  resources :club_groups
  resources :groups
  resources :categories
  resources :sub_categories
  resources :carriers
  resources :companies
  resources :coverage_brokers
  resources :coverage_carriers

  resources :sessions
  get "login", to: "sessions#new", as: :login
  get "logout", to: "sessions#destroy", as: :logout

  get "metrics", to: "home#metrics", as: :metrics  
  get "charts", to: "metrics#chart", as: :charts

  get "home", to: "home#index", as: :home

  root "home#index"
end
