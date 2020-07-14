class CoverageBrokersSerializer
    include FastJsonapi::ObjectSerializer
    attributes :id, :name

    attribute :company do |object|
        object.company do |company|
            company
        end
      end
  
  end
  