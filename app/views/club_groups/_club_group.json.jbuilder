json.extract! clubGroup, :id, :created_at, :updated_at
json.group clubGroup.group, :id, :name
json.club clubGroup.club, :id
