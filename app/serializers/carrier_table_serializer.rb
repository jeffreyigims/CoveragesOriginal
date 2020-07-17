class CarrierTableSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name

  attribute :associated_coverages do |object|
    object.coverage_carriers.length
  end
end
