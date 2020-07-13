class CategorySerializer
    include FastJsonapi::ObjectSerializer
    attributes :id, :name

    attribute :associated_sub_categories do |object|
      object.sub_categories.length
    end

    attribute :sub_categories do |object|
      object.sub_categories.map do |sub_category|
        SubCategorySerializer.new(sub_category).serializable_hash
      end
    end
  
  end
  