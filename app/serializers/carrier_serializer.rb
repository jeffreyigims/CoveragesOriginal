class CarrierSerializer
    include FastJsonapi::ObjectSerializer
    attributes :id, :name

    attribute :associated_coverages do |object|
      object.coverage_carriers.length
    end

    attribute :coverages do |object|
      object.coverage_carriers.map do |coverage_carriers|
        CoverageSerializer.new(coverage_broker.coverage).serializable_hash
      end
    end
  
  end
  