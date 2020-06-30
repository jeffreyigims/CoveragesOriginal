class CompaniesController < ApplicationController

    def index
        respond_to do |format|
            format.html { @companies = Company.all }
            format.json { @companies = Company.all }
        end 
    end

end
