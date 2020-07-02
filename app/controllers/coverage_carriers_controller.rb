class CoverageCarriersController < ApplicationController

    def create
        @coverage_carrier = CoverageCarrier.new(coverage_carrier_params)
        if @coverage_carrier.save
          render json: @coverage_carrier
        else
          render json: @coverage_carrier.errors, status: :unprocessable_entity
        end
    end

    private
    def coverage_carrier_params
      params.require(:coverage_carrier).permit(:id, :carrier_id, :coverage_id)
    end

end
