class CoverageCarrier < ApplicationRecord
  
  # Relationships
  belongs_to :carrier
  belongs_to :coverage
end
