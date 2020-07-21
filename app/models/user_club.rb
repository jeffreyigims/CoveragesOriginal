class UserClub < ApplicationRecord

  # Relationships
  belongs_to :user
  belongs_to :club

  # Scopes
  scope :active, -> { where(active: true) }
  scope :inactive, -> { where(active: false) }
end
