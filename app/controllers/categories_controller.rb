class CategoriesController < ApplicationController
  before_action :set_category, only: [:show, :update, :destroy]

  include Filterable
  include Orderable

  BOOLEAN_FILTERING_PARAMS = [[]]
  PARAM_FILTERING_PARAMS = []
  ORDERING_PARAMS = []

  def index
    @categories = boolean_filter(Category.alphabetical, BOOLEAN_FILTERING_PARAMS)
    @categories = param_filter(@categories, PARAM_FILTERING_PARAMS)
    @categories = order(@categories, ORDERING_PARAMS)
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
    @category = Category.new(category_params)
    if !@category.save
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
