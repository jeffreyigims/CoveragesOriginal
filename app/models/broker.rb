class Broker < ApplicationRecord
  belongs_to :contact
  belongs_to :company
end
