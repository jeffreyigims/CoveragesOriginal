class Category < ApplicationRecord

  # Relationships
  has_many :sub_categories
  has_many :coverages, through: :sub_categories

  # Scopes
  scope :alphabetical, -> { order("name ASC") }

  # Validations
  validates_uniqueness_of :name, case_sensitive: false # Validates presence of attribute as well

  # Callbacks
  before_destroy do
    verify_no_subs_associated_with_category
    if errors.present?
      throw(:abort)
    end
  end

  private

  def verify_no_subs_associated_with_category
    unless self.sub_categories.empty?
      errors.add(:base, "The category has associated subs and cannot be deleted now.")
    end
  end
end
