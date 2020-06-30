FactoryBot.define do
    factory :sub_category do
      name { "sponsorship" }
      association :category
    end
  end
  