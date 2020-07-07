# Require needed files
require "filters/actionable"
require "filters/filterable"
require "filters/orderable"

# Create AppHelpers
module AppHelpers
  include AppHelpers::Actionable
  include AppHelpers::Filterable
  include AppHelpers::Orderable
end
