FactoryBot.define do
    factory :club_group do
      association :club
      association :group
    end
  end
  