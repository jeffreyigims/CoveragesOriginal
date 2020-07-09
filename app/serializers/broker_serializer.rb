class BrokerSerializer
    include FastJsonapi::ObjectSerializer
    attributes :id, :round_num
    
    attribute :course do |object|
        Course.find_by(id: object.course_id).course_name
        # object.course.name
    end

    attribute :holes do |object|
        object.round_holes.map do |round_hole|
          RoundHoleSerializer.new(round_hole).serializable_hash
        end
      end
  
  end
  