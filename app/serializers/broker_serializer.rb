class BrokerSerializer
    include FastJsonapi::ObjectSerializer
    attributes :id, :name

    attribute :associated_coverages do |object|
      object.coverage_brokers.length
    end

    attribute :coverages do |object|
      object.coverage_brokers.map do |coverage_broker|
        CoverageSerializer.new(coverage_broker.coverage).serializable_hash
      end
    end

    attribute :company do |object|
      object.company
    end
  
  end
  