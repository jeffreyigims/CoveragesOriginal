FactoryBot.define do
  factory :user do
    first_name { "first_name" }
    last_name { "last_name" }
    role { "admin" }
    username { "user" }
    password { "secret" }
    password_confirmation { "secret" }
    active { true }
  end
end
