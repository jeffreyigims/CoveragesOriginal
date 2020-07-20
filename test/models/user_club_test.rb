require "test_helper"

describe UserClub do
  let(:user_club) { UserClub.new }

  it "must be valid" do
    value(user_club).must_be :valid?
  end
end
