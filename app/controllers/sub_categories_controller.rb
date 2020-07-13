class SubCategoriesController < ApplicationController
    before_action :set_sub_category, only: [:update, :show, :destroy]
  
    def index
      @sub_categories = SubCategory.all
      respond_to do |format|
        format.html { @sub_categories }
        format.json { render json: SubCategorySerializer.new(@sub_categories).serializable_hash }
      end
    end
  
    def show 
      respond_to do |format|
        format.html { @sub_category }
        format.json { render json: SubCategorySerializer.new(@sub_category).serializable_hash }
      end
    end 
  
    def create
      @sub_category = SubCategory.new(sub_category_params)
      if @sub_category.save
        render json: @sub_category
      else
        render json: @sub_category.errors, status: :unprocessable_entity
      end
    end
  
    def update
      if !@sub_category.update(sub_category_params)
        render json: @sub_category.errors, status: :unprocessable_entity
      end
    end
  
    def destroy
      @sub_category.destroy
      if !@sub_category.destroyed?
        render json: @sub_category.errors, status: :unprocessable_entity
      end
    end
  
    private
  
    def set_sub_category
      @sub_category = League.find(params[:id])
    end
  
    def sub_category_params
      params.require(:sub_category).permit(:id, :name, :category_id)
    end
  end
  