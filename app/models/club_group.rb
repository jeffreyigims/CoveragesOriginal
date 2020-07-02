class ClubGroup < ApplicationRecord
  belongs_to :club
  belongs_to :group
  has_one :league, through: :club
end
