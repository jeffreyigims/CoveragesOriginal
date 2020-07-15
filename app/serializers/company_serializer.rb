class CompanySerializer
    include FastJsonapi::ObjectSerializer
    attributes :id, :name

    attribute :brokers do |object|
        object.brokers.map do |broker|
          CompanyBrokerSerializer.new(broker).serializable_hash
        end
      end
  
  end
  
  class CompanyBrokerSerializer
    include FastJsonapi::ObjectSerializer
    attributes :id, :name

    attribute :associated_coverages do |object|
      object.coverage_brokers.length
    end
  
  end
  