class Company < ApplicationRecord

  # Relationships
  has_many :brokers

  # Scopes
  scope :alphabetical, -> { order("name ASC") }
end
