class SubCategory < ApplicationRecord
  belongs_to :category
  has_many :coverages
end
