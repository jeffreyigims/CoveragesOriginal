class SubCategorySerializer
    include FastJsonapi::ObjectSerializer
    attributes :id, :name, :category_id

    attribute :associated_coverages do |object|
      object.coverages.length
    end

    attribute :coverages do |object|
      object.coverages.map do |coverage|
        SubCategoryCoverageSerializer.new(coverage).serializable_hash
      end
    end
  
  end
  
  class SubCategoryCoverageSerializer
    include FastJsonapi::ObjectSerializer
    attributes :id, :has_coverage_line, :notes, :start_date, :end_date, :verified, :club_group_id

    attribute :club do |object|
        object.club_group.club
    end

    attribute :group do |object|
        object.club_group.group
    end
  
  end
  