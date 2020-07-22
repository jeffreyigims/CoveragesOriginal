FactoryBot.define do
  factory :user_club do
    association :user
    association :club    
  end
end
