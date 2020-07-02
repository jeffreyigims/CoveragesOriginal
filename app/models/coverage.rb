class Coverage < ApplicationRecord

  # Relationships
  belongs_to :club_group
  belongs_to :sub_category
  has_one :group, through: :club_group
  has_one :club, through: :club_group
  has_one :category, through: :sub_category
  has_one :league, through: :club
  has_one :sport, through: :league

  # Scopes
  scope :verified,    ->  { where(verified: true) }
  scope :unverified,  ->  { where(verified: false) }

end
