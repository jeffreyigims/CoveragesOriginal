class ClubGroup < ApplicationRecord

  # Relationships
  belongs_to :club
  belongs_to :group
  has_many :coverages
  has_one :league, through: :club

  # Scopes
  scope :alphabetical, -> { joins(:group).order("group.name ASC") }
end
