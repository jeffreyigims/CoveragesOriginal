class Club < ApplicationRecord
  belongs_to :league
  has_one :sport, through: :league
end
