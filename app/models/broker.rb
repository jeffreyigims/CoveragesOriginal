class Broker < ApplicationRecord

  # Relationships
  belongs_to :company
  has_many :coverage_brokers
  has_many :coverages, through: :coverage_brokers

  # Scopes
  scope :alphabetical, -> { order("name ASC") }

  # Validations
  validates_presence_of :name

  # Callbacks
  before_destroy do
    verify_no_coverages_associated_with_broker
    if errors.present?
      throw(:abort)
    end
  end

  private

  def verify_no_coverages_associated_with_broker
    unless self.coverage_brokers.empty?
      errors.add(:base, "The broker has associated coverages and cannot be deleted now.")
    end
  end
end
