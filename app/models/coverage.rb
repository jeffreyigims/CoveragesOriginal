class Coverage < ApplicationRecord

  # Relationships
  belongs_to :club_group
  belongs_to :sub_category
  belongs_to :user
  has_one :group, through: :club_group
  has_one :club, through: :club_group
  has_one :category, through: :sub_category
  has_one :league, through: :club
  has_one :sport, through: :league
  has_many :coverage_carriers
  has_many :coverage_brokers
  has_many :carriers, through: :coverage_carriers
  has_many :brokers, through: :coverage_brokers

  # Scopes
  scope :verified, -> { where(verified: true) }
  scope :unverified, -> { where(verified: false) }
  scope :for_league, ->(league_id) { joins(:club_group).joins(:club).where('league_id = ?', league_id) } 
  scope :for_club, ->(club_id) { joins(:club_group).where('club_id = ?', club_id) } 
  scope :for_club_group, ->(club_group_id) { where('club_group_id = ?', club_group_id) } 
  scope :chronological, -> { order(Arel.sql('start_date DESC, end_date IS NOT NULL, end_date DESC')) }
  scope :most_recent, -> { order(Arel.sql('created_at DESC')) }

  before_destroy :destroy_attachments

  def verify 
    self.update_attribute("verified", true) 
    self.reload
  end 

  private

  def destroy_attachments
    self.coverage_carriers.each { |i| i.destroy }
    self.coverage_brokers.each { |i| i.destroy }
  end
end
