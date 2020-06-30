class SportsController < ApplicationController

    def index
        respond_to do |format|
            format.html { @sports = Sport.all }
            format.json { @sports = Sport.all }
        end 
    end

    def show 
    end 

end
