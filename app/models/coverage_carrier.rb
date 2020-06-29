class CoverageCarrier < ApplicationRecord
  belongs_to :carrier
  belongs_to :coverage
end
