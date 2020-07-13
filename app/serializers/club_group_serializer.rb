class ClubGroupSerializer
    include FastJsonapi::ObjectSerializer
    attributes :id

    attribute :group do |object|
        object.group
    end
  
  end
  