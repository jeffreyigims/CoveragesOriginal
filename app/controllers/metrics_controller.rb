class MetricsController < ApplicationController

    def metrics 
      @coverages = Coverage.all 
      render json: MetricsCoverageSerializer.new(@coverages).serializable_hash
    end 
  
    def chart
      @league = League.find_by(id: params[:league_id]) unless params[:league_id].nil?
      @coverages = Coverage.for_league(@league.id)
      @new = @coverages.map do |i| 
        [i, i.coverage_brokers.map { |j| j.broker.company.name}, i.sub_category.name, i.category.name]
      end 

      @new = @new.map do |i| 
        
        i[1].map do |j| 
            
            [j, i[2], i[3], 1.0/(i[1].length)]
        end 
    end

    @new = @new.flatten(1).group_by { |i| i[0] }
    puts @new

    @new = @new.map { |k, v| [k, v.inject(0){ |sum, j| sum + j[3] }] }.to_h
    c = 0
    @new = @new.map do |k, v|
        { id: k, label: k, value: v }
    end 
    render json: @new



      
    end

    private 

  
  end
  