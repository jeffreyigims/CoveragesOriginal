class Carrier < ApplicationRecord
    
    # Relationships 
    has_many :coverage_carriers
    has_many :coverages, through: :coverage_brokers

end
