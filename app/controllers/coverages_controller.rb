class CoveragesController < ApplicationController

    def index
      @coverages = Coverage.all
      if(params[:verified].present?)
        @coverages = params[:verified] == "true" ? @coverages.verified : @coverages.unverified
      end
      respond_to do |format|
        format.html { @coverages }
        format.json { @coverages }
      end 
    end

    def create
        @coverage = Coverage.new(coverage_params)
        if @coverage.save
          render json: @coverage
        else
          render json: @coverage.errors, status: :unprocessable_entity
        end
    end

    private
    def coverage_params
      params.require(:coverage).permit(:id, :has_coverage_line, :notes, :start_date, :end_date, :verified, :sub_category_id, :club_group_id)
    end

end
