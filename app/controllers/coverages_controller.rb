class CoveragesController < ApplicationController
  before_action :set_coverage, only: [:update, :destroy]

  include Filterable
  include Orderable

  BOOLEAN_FILTERING_PARAMS = [[:verified, :unverified]]
  PARAM_FILTERING_PARAMS = [:for_league, :for_club, :for_club_group]
  # ORDERING_PARAMS = [:alphabetical]

  def index
    @coverages = boolean_filter(Coverage.all, BOOLEAN_FILTERING_PARAMS)
    @coverages = param_filter(@coverages, PARAM_FILTERING_PARAMS)
    # @coverages = order(@coverages, ORDERING_PARAMS)
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

  def update
    if !@coverage.update(coverage_params)
      render json: @coverage.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @coverage.destroy
    if !@coverage.destroyed?
      render json: @coverage.errors, status: :unprocessable_entity
    end
  end

  private

  def set_coverage
    @coverage = Coverage.find(params[:id])
  end

  def coverage_params
    params.require(:coverage).permit(:id, :has_coverage_line, :notes, :start_date, :end_date, :verified, :sub_category_id, :club_group_id)
  end
end
