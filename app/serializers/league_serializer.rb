class LeagueSerializer
    include FastJsonapi::ObjectSerializer
    attributes :id, :name, :level, :sport_id

    attribute :sport do |object|
      object.sport
    end

    attribute :club_groups do |object|
        object.club_groups.map do |club_group|
          ClubGroupSerializer.new(club_group).serializable_hash
        end
    end
  end
  