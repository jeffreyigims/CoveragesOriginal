class BrokerSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name

  attribute :associated_coverages do |object|
    object.coverage_brokers.length
  end

  attribute :coverages do |object|
    object.coverage_brokers.map do |coverage_broker|
      BrokerCoverageSerializer.new(coverage_broker.coverage).serializable_hash
    end
  end

  attribute :company do |object|
    object.company
  end
end

class BrokerCoverageSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :has_coverage_line, :notes, :start_date, :end_date, :verified, :club_group_id

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
end
