class CarriersController < ApplicationController

    def index
        respond_to do |format|
            format.html { @carriers = Carrier.all }
            format.json { @carriers = Carrier.all }
        end 
    end

end
