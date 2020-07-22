class Broker < ApplicationRecord

  # Relationships
  belongs_to :company
  has_many :coverage_brokers
  has_many :coverages, through: :coverage_brokers
  
end
