class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

  # scope :alphabetical, -> { order("name ASC") }

end
