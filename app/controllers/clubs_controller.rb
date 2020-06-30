class ClubsController < ApplicationController

    def index
        respond_to do |format|
            format.html { @clubs = Club.all }
            format.json { @clubs = Club.all }
        end 
    end

    def show 
    end 

end
