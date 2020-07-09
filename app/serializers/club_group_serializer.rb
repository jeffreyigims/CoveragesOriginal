class ClubGroupSerializer
    include FastJsonapi::ObjectSerializer
    attributes :id
    
    attribute :club do |object|
        object.club
    end

    attribute :club do |object|
        object.group
    end

    attribute :coverages do |object|
        object.coverages.map do |coverage|
          CoverageSerializer.new(coverage).serializable_hash
        end
      end
  
  end
  