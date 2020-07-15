class Category < ApplicationRecord
    
    # Relationships 
    has_many :sub_categories
end
