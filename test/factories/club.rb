FactoryBot.define do
    factory :club do
      name { "Steelers" }
      abbreviation { "STL" }
      association :league
    end
  end
  