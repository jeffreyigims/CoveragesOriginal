class Club < ApplicationRecord
  
  # Relationships
  belongs_to :league
  has_one :sport, through: :league
  has_many :club_groups

  # Scopes 
  scope :for_league, ->(league_id) { where('league_id = ?', league_id) } 

end
