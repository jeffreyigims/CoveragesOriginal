class Sport < ApplicationRecord

  # Relationships
  has_many :leagues

  # Validations
  validates_presence_of :name
end
