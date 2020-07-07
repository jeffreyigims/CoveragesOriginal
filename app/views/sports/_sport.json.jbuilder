json.extract! sport, :id, :name, :created_at, :updated_at
json.associated_leagues sport.leagues.count
json.leagues sport.leagues, :id, :name
