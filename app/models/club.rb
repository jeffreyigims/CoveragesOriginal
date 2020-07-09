class Club < ApplicationRecord
  belongs_to :league
  has_one :sport, through: :league
  has_many :club_groups
end
