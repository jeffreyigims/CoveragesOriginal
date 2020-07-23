class Carrier < ApplicationRecord

  # Relationships
  has_many :coverage_carriers
  has_many :coverages, through: :coverage_brokers

  # Scopes
  scope :alphabetical, -> { order("name ASC") }

  # Validations
  validates_uniqueness_of :name, case_sensitive: false # Validates presence of attribute as well

  # Callbacks
  before_destroy do
    verify_no_coverages_associated_with_carrier
    if errors.present?
      throw(:abort)
    end
  end

  private

  def verify_no_coverages_associated_with_carrier
    unless self.coverage_carriers.empty?
      errors.add(:base, "The carrier has associated coverages and cannot be deleted now.")
    end
  end
end
