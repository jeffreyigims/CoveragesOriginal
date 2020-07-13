class SportSerializer
    include FastJsonapi::ObjectSerializer
    attributes :id, :name

    attribute :associated_leagues do |object|  
        object.leagues.length 
    end 
end
  