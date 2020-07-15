class CarrierContact < ApplicationRecord
  
  # Relationships 
  belongs_to :contact
  belongs_to :carrier
end
