class Broker < ApplicationRecord
  # belongs_to :contact
  belongs_to :company
  has_many :coverage_brokers
end
 