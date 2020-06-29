FactoryBot.define do
    factory :league do
      name { "NFL" }
      association :sport
    end
  end
  