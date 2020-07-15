class ClubGroup < ApplicationRecord
  
  # Relationships
  belongs_to :club
  belongs_to :group
  has_many :coverages
  has_one :league, through: :club
end
