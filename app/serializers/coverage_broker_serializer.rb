class CoverageBrokerSerializer
    include FastJsonapi::ObjectSerializer
    attributes :id, :broker_id

    attribute :broker do |object|
        object.broker do |broker|
            broker
        end
      end
  
  end
  