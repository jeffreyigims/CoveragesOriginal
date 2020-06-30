class BrokersController < ApplicationController

    def index
        respond_to do |format|
            format.html { @brokers = Broker.all }
            format.json { @brokers = Broker.all }
        end 
    end

end
