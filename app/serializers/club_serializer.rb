class ClubSerializer
    include FastJsonapi::ObjectSerializer
    attributes :id, :name, :abbreviation

    attribute :club_groups_count do |object|
        object.club_groups.length
    end

    attribute :league do |object|
        object.league
    end
    
    attribute :club_groups do |object|
        object.club_groups.map do |club_group|
            ClubGroupSerializer.new(club_group).serializable_hash
        end    
    end
end
  