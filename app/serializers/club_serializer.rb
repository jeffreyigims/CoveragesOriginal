class ClubSerializer
    include FastJsonapi::ObjectSerializer
    attributes :id, :name, :abbreviation, :league_id

    attribute :club_groups_count do |object|
        object.club_groups.length
    end

    attribute :league do |object|
        object.league
    end
    
    attribute :club_groups do |object|
        object.club_groups.map do |club_group|
            ClubClubGroupSerializer.new(club_group).serializable_hash
        end    
    end
end

class ClubClubGroupSerializer
    include FastJsonapi::ObjectSerializer
    attributes :id

    attribute :group do |object|
        object.group
    end
  
  end
  