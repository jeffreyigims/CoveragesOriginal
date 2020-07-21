class ClubContact < ApplicationRecord
  
  # Relationships
  belongs_to :contact
  belongs_to :club

  # Scopes 
  scope :active,      -> { where(active: true) }
  scope :inactive,    -> { where(active: false) }

end
