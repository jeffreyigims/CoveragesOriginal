class CoverageBroker < ApplicationRecord

  # Relationships
  belongs_to :broker
  belongs_to :coverage
end
