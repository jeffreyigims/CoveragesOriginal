# Require needed files
require "filters/actionable"
require "filters/filterable"
require "filters/orderable"
require "helpers/scopes"

# Create AppHelpers
module AppHelpers
  include AppHelpers::Actionable
  include AppHelpers::Filterable
  include AppHelpers::Orderable
  include AppHelpers::OrderingScopes
end
