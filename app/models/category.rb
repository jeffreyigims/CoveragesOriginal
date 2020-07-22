class Category < ApplicationRecord
    
    # Relationships 
    has_many :sub_categories
    has_many :coverages, through: :sub_categories
    
end
