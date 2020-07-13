class CategoriesController < ApplicationController
    before_action :set_category, only: [:update, :show, :destroy]
  
    def index
      @categories = Category.all
      respond_to do |format|
        format.html { @categories }
        format.json { render json: CategorySerializer.new(@categories).serializable_hash }
      end
    end
  
    def show 
      respond_to do |format|
        format.html { @category }
        format.json { render json: CategorySerializer.new(@category).serializable_hash }
      end
    end 
  
    def create
      @category = SubCategory.new(category_params)
      if @category.save
        render json: @category
      else
        render json: @category.errors, status: :unprocessable_entity
      end
    end
  
    def update
      if !@category.update(category_params)
        render json: @category.errors, status: :unprocessable_entity
      end
    end
  
    def destroy
      @category.destroy
      if !@category.destroyed?
        render json: @category.errors, status: :unprocessable_entity
      end
    end
  
    private
  
    def set_category
      @category = Category.find(params[:id])
    end
  
    def category_params
      params.require(:category).permit(:id, :name)
    end
  end
  