class ClubGroupsController < ApplicationController

    def index
        respond_to do |format|
            format.html { @clubGroups = ClubGroup.all }
            format.json { @clubGroups = ClubGroup.all }
        end 
    end

    def show 
    end 

end
