class CoverageBrokersController < ApplicationController
  before_action :set_coverage_broker, only: [:destroy]

  include Filterable
  include Orderable

  BOOLEAN_FILTERING_PARAMS = [[]]
  PARAM_FILTERING_PARAMS = []
  ORDERING_PARAMS = []

  def index
    @coverage_brokers = boolean_filter(CoverageBroker.all, BOOLEAN_FILTERING_PARAMS)
    @coverage_brokers = param_filter(@coverage_brokers, PARAM_FILTERING_PARAMS)
    @coverage_brokers = order(@coverage_brokers, ORDERING_PARAMS)
    respond_to do |format|
      format.html { @coverage_brokers }
      format.json { render json: CoverageBrokerSerializer.new(@coverage_brokers).serializable_hash }
    end
  end

  def create
    @coverage_broker = CoverageBroker.new(coverage_broker_params)
    if !@coverage_broker.save
      render json: @coverage_broker.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @coverage_broker.destroy
    if !@coverage_broker.destroyed?
      render json: @coverage_broker.errors, status: :unprocessable_entity
    end
  end

  private

  def set_coverage_broker
    @coverage_broker = CoverageBroker.find(params[:id])
  end

  def coverage_broker_params
    params.require(:coverage_broker).permit(:id, :broker_id, :coverage_id)
  end
end
