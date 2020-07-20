class UserClub < ApplicationRecord

    # Relationships
    belongs_to :user 
    belongs_to :club
    
end
