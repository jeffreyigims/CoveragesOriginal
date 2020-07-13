class CarriersController < ApplicationController
  before_action :set_carrier, only: [:show, :update, :destroy]

  include Filterable
  include Orderable

  BOOLEAN_FILTERING_PARAMS = [[]]
  PARAM_FILTERING_PARAMS = []
  ORDERING_PARAMS = []

  def index
    @carriers = boolean_filter(Carrier.all, BOOLEAN_FILTERING_PARAMS)
    @carriers = param_filter(@carriers, PARAM_FILTERING_PARAMS)
    @carriers = order(@carriers, ORDERING_PARAMS)
    respond_to do |format|
      format.html { @carriers }
      format.json { render json: CarrierSerializer.new(@carriers).serializable_hash }
    end
end

def show 
  respond_to do |format|
    format.html { @carrier }
    format.json { render json: CarrierSerializer.new(@carrier).serializable_hash }
  end
end 

  def create
    @carrier = Carrier.new(carrier_params)
    if @carrier.save
      render json: @carrier
    else
      render json: @carrier.errors, status: :unprocessable_entity
    end
  end

  def update
    if !@carrier.update(carrier_params)
      render json: @carrier.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @carrier.destroy
    if !@carrier.destroyed?
      render json: @carrier.errors, status: :unprocessable_entity
    end
  end

  private

  def set_carrier
    @carrier = Carrier.find(params[:id])
  end

  def carrier_params
    params.require(:carrier).permit(:id, :name)
  end
end
