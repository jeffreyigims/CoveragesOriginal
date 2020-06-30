FactoryBot.define do
    factory :broker do
      name { "Name" }
      # association :contact
      association :company
    end
  end
  