# Require needed files
# require "filters/actionable"
# require "filters/filterable"
# require "filters/orderable"
require "helpers/scopes"
require 'helpers/validations'
require 'helpers/deletions'
require 'helpers/activeable'

# Create AppHelpers
module AppHelpers
  # include AppHelpers::Actionable
  # include AppHelpers::Filterable
  # include AppHelpers::Orderable
  include AppHelpers::OrderingScopes
  include AppHelpers::Validations
  include AppHelpers::Deletions
  include AppHelpers::Activeable::ClassMethods
  include AppHelpers::Activeable::InstanceMethods
end
