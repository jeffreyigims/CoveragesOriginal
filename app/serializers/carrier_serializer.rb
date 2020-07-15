class CarrierSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name

  attribute :associated_coverages do |object|
    object.coverage_carriers.length
  end

  attribute :coverages do |object|
    object.coverage_carriers.map do |coverage_carrier|
      CarrierCoverageSerializer.new(coverage_carrier.coverage).serializable_hash
    end
  end
end

class CarrierCoverageSerializer
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
