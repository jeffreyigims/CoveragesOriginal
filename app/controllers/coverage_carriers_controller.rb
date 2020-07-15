class CoverageCarriersController < ApplicationController
  before_action :set_coverage_carrier, only: [:destroy]

  include Filterable
  include Orderable

  BOOLEAN_FILTERING_PARAMS = [[]]
  PARAM_FILTERING_PARAMS = []
  ORDERING_PARAMS = []

  def index
    @coverage_carriers = boolean_filter(CoverageCarrier.all, BOOLEAN_FILTERING_PARAMS)
    @coverage_carriers = param_filter(@coverage_carriers, PARAM_FILTERING_PARAMS)
    @coverage_carriers = order(@coverage_carriers, ORDERING_PARAMS)
    respond_to do |format|
      format.html { @coverage_carriers }
      format.json { render json: CoverageCarrierSerializer.new(@coverage_carriers).serializable_hash }
    end
  end

  def create
    @coverage_carrier = CoverageCarrier.new(coverage_carrier_params)
    if !@coverage_carrier.save
      render json: @coverage_carrier.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @coverage_carrier.destroy
    if !@coverage_carrier.destroyed?
      render json: @coverage_carrier.errors, status: :unprocessable_entity
    end
  end

  private

  def set_coverage_carrier
    @coverage_carrier = CoverageCarrier.find(params[:id])
  end

  def coverage_carrier_params
    params.require(:coverage_carrier).permit(:id, :carrier_id, :coverage_id)
  end
end
