class SportSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name

  attribute :leagues do |object|
    object.leagues.map do |league|
      SportLeagueSerializer.new(league).serializable_hash
    end
  end
end

class SportLeagueSerializer
  include FastJsonapi::ObjectSerializer
  attributes :id, :name, :level
end
