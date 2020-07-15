class Broker < ApplicationRecord

  # Relationships
  belongs_to :company
  has_many :coverage_brokers
end
