json.extract! club, :id, :name, :abbreviation, :created_at, :updated_at
json.league club.league, :id, :name
json.groups club.club_groups, :id, :group