class CoverageBrokerSerializer
    include FastJsonapi::ObjectSerializer
    attributes :id

    attribute :broker do |object|
        object.broker do |broker|
            broker
        end
      end
  
  end
  