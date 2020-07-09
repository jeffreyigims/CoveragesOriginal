class CoverageSerializer
    include FastJsonapi::ObjectSerializer
    attributes :id

    attribute :subcategory do |object|
        object.sub_category
    end

    attribute :category do |object|
        object.category
    end

    attribute :coverage_brokers do |object|
        object.coverage_brokers.map do |coverage_broker|
          CoverageBrokerSerializer.new(coverage_broker).serializable_hash
        end
      end
  
  end
  