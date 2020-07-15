class ClubContact < ApplicationRecord
  
  # Relationships
  belongs_to :contact
  belongs_to :club
end
