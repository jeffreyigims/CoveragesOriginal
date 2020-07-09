class League < ApplicationRecord
    # Relationships
    belongs_to :sport
    has_many :clubs
    has_many :club_groups, through: :clubs

    # Scopes
end


