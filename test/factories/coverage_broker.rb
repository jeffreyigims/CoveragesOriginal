FactoryBot.define do
    factory :coverage_broker do
      association :broker 
      association :coverage
    end
  end
  