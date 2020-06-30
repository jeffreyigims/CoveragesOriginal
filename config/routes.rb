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
  root 'coverages#index'

end
