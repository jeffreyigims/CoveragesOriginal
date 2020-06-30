json.extract! company, :id, :name, :created_at, :updated_at
json.brokers company.brokers, :id, :name
