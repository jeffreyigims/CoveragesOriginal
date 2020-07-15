class SubCategory < ApplicationRecord

  # Relationships
  belongs_to :category
  has_many :coverages
end
