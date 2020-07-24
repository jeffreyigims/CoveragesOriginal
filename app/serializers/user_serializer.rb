class UserSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :first_name, :last_name, :role, :username

  attribute :club do |object|
    object.current_club || ""
  end

  attribute :current_contact do |object|
   UserClubSerializer.new(object.current_contact).serializable_hash
  end

  attribute :coverages do |object|
    object.coverages.map do |coverage|
      CoverageSerializer.new(coverage).serializable_hash
    end
  end
end
