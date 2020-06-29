class CarrierContact < ApplicationRecord
  belongs_to :contact
  belongs_to :carrier
end
