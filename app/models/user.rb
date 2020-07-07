class User < ApplicationRecord
  has_secure_password

  # For authentication
  ROLES_LIST = [["Administrator", "admin"]].freeze

  def role?(authorized_role)
    return false if role.nil?
    role.downcase.to_sym == authorized_role
  end

  # login by username
  def User.authenticate(username, password)
    find_by_username(username).try(:authenticate, password)
  end
end
