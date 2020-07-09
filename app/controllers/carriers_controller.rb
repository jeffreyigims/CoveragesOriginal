class CarriersController < ApplicationController
    before_action :set_carrier, only: [:update, :destroy]
  
    def index
      @carriers = Carrier.all
      respond_to do |format|
        format.html { @carriers }
        format.json { @carriers }
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
      @carrier = Sport.find(params[:id])
    end
  
    def carrier_params
      params.require(:carrier).permit(:id, :name)
    end
  end
  