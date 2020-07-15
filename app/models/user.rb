class User < ApplicationRecord
  has_secure_password

  # Scopes 
  scope :alphabetical,    -> { order('last_name, first_name') }

  # For authentication
  ROLES_LIST = [["Administrator", "admin"], ["Employee", "employee"], ["Contact", "contact"]].freeze

  def role?(authorized_role)
    return false if role.nil?
    role.downcase.to_sym == authorized_role
  end

  # login by username
  def User.authenticate(username, password)
    find_by_username(username).try(:authenticate, password)
  end
end
