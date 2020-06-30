class LeaguesController < ApplicationController

    def index
        respond_to do |format|
            format.html { @leagues = League.all }
            format.json { @leagues = League.all }
        end 
    end

    def show 
    end 

end
