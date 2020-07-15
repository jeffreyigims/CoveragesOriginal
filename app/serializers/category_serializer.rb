class CategorySerializer
    include FastJsonapi::ObjectSerializer
    attributes :id, :name

    attribute :associated_sub_categories do |object|
      object.sub_categories.length
    end

    attribute :sub_categories do |object|
      object.sub_categories.map do |sub_category|
        CategorySubCategorySerializer.new(sub_category).serializable_hash
      end
    end
  
  end

  class CategorySubCategorySerializer
    include FastJsonapi::ObjectSerializer
    attributes :id, :name, :category_id

    attribute :associated_coverages do |object|
      object.coverages.length
    end

  end
  
  