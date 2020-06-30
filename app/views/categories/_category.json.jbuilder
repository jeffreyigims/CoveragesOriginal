json.extract! category, :id, :name, :created_at, :updated_at
json.sub_categories category.sub_categories, :id, :name
