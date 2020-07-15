class LeagueSerializer
    include FastJsonapi::ObjectSerializer
    attributes :id, :name, :level, :sport_id

    attribute :sport do |object|
      object.sport
    end

    # attribute :club_groups do |object|
    #     object.club_groups.map do |club_group|
    #       ClubGroupSerializer.new(club_group).serializable_hash
    #     end
    # end

    attribute :clubs do |object|
        object.clubs.map do |club|
          LeagueClubSerializer.new(club).serializable_hash
        end
    end
  end

  class LeagueClubSerializer
    include FastJsonapi::ObjectSerializer
    attributes :id, :name, :abbreviation

    attribute :club_groups_count do |object|
      object.club_groups.length
    end
  end
  