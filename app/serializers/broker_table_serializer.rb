class BrokerTableSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name

  attribute :associated_coverages do |object|
    object.coverage_brokers.length
  end

  attribute :company do |object|
    object.company
  end
end
