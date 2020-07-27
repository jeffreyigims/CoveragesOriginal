class CoverageSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :has_coverage_line, :notes, :start_date, :end_date, :verified, :club_group_id, :created_at, :updated_at

  attribute :league do |object|
    object.club_group.club.league
  end

  attribute :club do |object|
    object.club_group.club
  end

  attribute :group do |object|
    object.club_group.group
  end

  attribute :category do |object|
    object.category
  end

  attribute :sub_category do |object|
    object.sub_category
  end

  attribute :user do |object|
    object.user
  end

  attribute :coverage_brokers do |object|
    object.coverage_brokers.map do |coverage_broker|
      CoverageCoverageBrokerSerializer.new(coverage_broker).serializable_hash
    end
  end

  attribute :coverage_carriers do |object|
    object.coverage_carriers.map do |coverage_carrier|
      CoverageCoverageCarrierSerializer.new(coverage_carrier).serializable_hash
    end
  end

  attribute :carriers do |object|
    object.carriers.map do |carrier|
      carrier
    end
  end

  # attribute :brokers do |object|
  #     object.brokers.map do |broker|
  #       CoverageBrokersSerializer.new(broker).serializable_hash
  #     end
  # end

end

class CoverageCoverageBrokerSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :broker_id
end

class CoverageCoverageCarrierSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :carrier_id
end
