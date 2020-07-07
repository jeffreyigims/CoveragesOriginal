class CoverageCarriersController < ApplicationController
  before_action :set_coverage_carrier, only: [:show, :update, :destroy]

  def index
    @coverage_carriers = CoverageCarrier.all
    render json: @coverage_carriers
  end

  def show
    render json: @coverage_carrier
  end

  def create
    @coverage_carrier = CoverageCarrier.new(coverage_carrier_params)
    if @coverage_carrier.save
      render json: @coverage_carrier
    else
      render json: @coverage_carrier.errors, status: :unprocessable_entity
    end
  end

  def update
    if @coverage_carrier.update(coverage_carrier_params)
      render json: @coverage_carrier
    else
      render json: @coverage_carrier.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @coverage_carrier.destroy
    if !@coverage_carrier.destroyed
      render json: @coverage_carrier.errors, status: :unprocessable_entity
    end
  end

  private

  def set_coverage_carrier
    @coverage_carrier = CoverageBroker.find(params[:id])
  end

  def coverage_carrier_params
    params.require(:coverage_carrier).permit(:id, :carrier_id, :coverage_id)
  end
end
