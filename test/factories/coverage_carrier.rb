FactoryBot.define do
    factory :coverage_carrier do
      association :carrier
      association :coverage
    end
  end
  