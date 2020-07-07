json.extract! coverage, :id, :has_coverage_line, :notes, :start_date, :verified, :end_date, :created_at, :updated_at
json.category coverage.category, :id, :name
json.sub_category coverage.sub_category, :id, :name
json.club coverage.club, :id, :name
json.group coverage.group, :id, :name
json.league coverage.league, :id, :name
json.sport coverage.sport, :id, :name
