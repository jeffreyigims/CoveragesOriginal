class ClubGroupSerializer
    include FastJsonapi::ObjectSerializer
    attributes :id

    attribute :club do |object|
        object.club
    end

    attribute :league do |object|
        object.league
    end
  
  end
  