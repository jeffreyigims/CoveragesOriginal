class MetricsCoverageSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :has_coverage_line, :verified

  attribute :league do |object|
    object.club_group.club.league.name
  end

  attribute :club do |object|
    object.club_group.club.name
  end

  attribute :group do |object|
    object.club_group.group.name
  end

  attribute :category do |object|
    object.category.name
  end

  attribute :sub_category do |object|
    object.sub_category.name
  end

  attribute :carrier do |object|
    object.coverage_carriers.empty? ? "" : object.coverage_carriers.first.carrier.name
  end

  attribute :broker do |object|
    object.coverage_brokers.empty? ? "" : object.coverage_brokers.first.broker.company.name
  end
end
