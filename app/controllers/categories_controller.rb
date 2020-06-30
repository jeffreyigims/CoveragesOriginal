class CategoriesController < ApplicationController

    def index
        respond_to do |format|
            format.html { @categories = Category.all }
            format.json { @categories = Category.all }
        end 
    end

end
