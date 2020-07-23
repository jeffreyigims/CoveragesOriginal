class Group < ApplicationRecord

  # Relationships
  has_many :club_groups
  has_many :clubs, through: :club_groups 
  has_many :coverages, through: :club_groups

  # Scopes
  scope :alphabetical, -> { order("name ASC") }
  
end
