class SubCategoriesController < ApplicationController

    def index
        respond_to do |format|
            format.html { @subCategories = SubCategory.all }
            format.json { @subCategories = SubCategory.all }
        end 
    end

end
