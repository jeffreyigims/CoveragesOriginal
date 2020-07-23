class SubCategory < ApplicationRecord

  # Relationships
  belongs_to :category
  has_many :coverages

  # Scopes
  scope :alphabetical, -> { order("name ASC") }
end
