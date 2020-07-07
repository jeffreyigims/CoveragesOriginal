class CoverageBrokersController < ApplicationController
  before_action :set_coverage_broker, only: [:show, :update, :destroy]

  def index
    @coverage_brokers = CoverageBroker.all
    render json: @coverage_brokers
  end

  def show
    render json: @coverage_broker
  end

  def create
    @coverage_broker = CoverageBroker.new(coverage_broker_params)
    if @coverage_broker.save
      render json: @coverage_broker
    else
      render json: @coverage_broker.errors, status: :unprocessable_entity
    end
  end

  def update
    if @coverage_broker.update(coverage_broker_params)
      render json: @coverage_broker
    else
      render json: @coverage_broker.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @coverage_broker.destroy
    if !@coverage_broker.destroyed
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
