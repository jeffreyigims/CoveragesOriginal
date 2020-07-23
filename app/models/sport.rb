class Sport < ApplicationRecord

  # Relationships
  has_many :leagues
  has_many :clubs, through: :leagues

  # Validations
  validates_presence_of :name

  # Scopes
  scope :alphabetical, -> { order("name ASC") }
end
