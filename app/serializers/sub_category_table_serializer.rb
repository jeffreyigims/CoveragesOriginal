class SubCategoryTableSerializer
    include FastJsonapi::ObjectSerializer
    attributes :id, :name, :category_id
  
  end

  