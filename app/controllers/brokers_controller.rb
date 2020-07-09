class BrokersController < ApplicationController
  def index
    @brokers = Broker.all
    # render json: BrokerSerializer.new(@brokers).serializable_hash
    respond_to do |format|
      format.html { @brokers }
      format.json { @brokers }
    end
  end
end
