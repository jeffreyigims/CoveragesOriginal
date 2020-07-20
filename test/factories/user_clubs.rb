FactoryBot.define do
  factory :user_club do
    association :user
    association :club    
    active { true }
  end
end
