class League < ApplicationRecord

  # Relationships
  belongs_to :sport
  has_many :clubs
  has_many :club_groups, through: :clubs

  # Scopes
  scope :alphabetical, -> { order("name ASC") }
  scope :for_sport, ->(sport_id) { where("sport_id = ?", sport_id) }
end
