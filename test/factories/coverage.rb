FactoryBot.define do
    factory :coverage do
      has_coverage_line { true }
      notes { "Notes" }
      start_date { Date.today }
      end_date { Date.today }
      verified { true }
      association :club_group 
      association :sub_category
      association :user
    end
  end
  