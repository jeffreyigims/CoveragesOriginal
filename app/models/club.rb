class Club < ApplicationRecord
  
  # Relationships
  belongs_to :league
  has_one :sport, through: :league
  has_many :club_groups
  has_many :coverages, through: :club_groups 
  has_many :groups, through: :club_groups

  # Scopes 
  scope :alphabetical, -> { order("name ASC") }
  scope :for_league, ->(league_id) { where('league_id = ?', league_id) } 
  scope :search, ->(term) { where('name LIKE ?', "#{term}%") }

  # Validations
  validates_presence_of :name

  # Callbacks
  before_destroy do
    verify_no_groups_associated_with_club
    if errors.present?
      throw(:abort)
    end
  end

  private

  def verify_no_groups_associated_with_club
    unless self.club_groups.empty?
      errors.add(:base, "The club has associated groups and cannot be deleted now.")
    end
  end

end
