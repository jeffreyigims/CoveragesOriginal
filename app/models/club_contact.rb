class ClubContact < ApplicationRecord
  belongs_to :contact
  belongs_to :club
end
