class CoverageBrokersController < ApplicationController

    def create
        @coverage_broker = CoverageBroker.new(coverage_broker_params)
        if @coverage_broker.save
          render json: @coverage_broker
        else
          render json: @coverage_broker.errors, status: :unprocessable_entity
        end
    end

    private
    def coverage_broker_params
      params.require(:coverage_broker).permit(:id, :broker_id, :coverage_id)
    end

end
