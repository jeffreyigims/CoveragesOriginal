class SubCategorySerializer
    include FastJsonapi::ObjectSerializer
    attributes :id, :name, :category_id

    attribute :associated_coverages do |object|
      object.coverages.length
    end

    attribute :coverages do |object|
      object.coverages.map do |coverage|
        CoverageSerializer.new(coverage).serializable_hash
      end
    end
  
  end
  