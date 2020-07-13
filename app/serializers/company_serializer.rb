class CompanySerializer
    include FastJsonapi::ObjectSerializer
    attributes :id, :name

    attribute :brokers do |object|
        object.brokers.map do |broker|
          BrokerSerializer.new(broker).serializable_hash
        end
      end
  
  end
  