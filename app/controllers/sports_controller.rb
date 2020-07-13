class SportsController < ApplicationController
  before_action :set_sport, only: [:update, :show, :destroy]

  def index
    @sports = Sport.all
    respond_to do |format|
      format.html { @sports }
      format.json { render json: SportSerializer.new(@sports).serializable_hash }
    end
  end

  def show 
    respond_to do |format|
      format.html { @sport }
      format.json { render json: SportSerializer.new(@sport).serializable_hash }
    end
  end 

  def create
    @sport = Sport.new(sport_params)
    if @sport.save
      render json: @sport
    else
      render json: @sport.errors, status: :unprocessable_entity
    end
  end

  def update
    if !@sport.update(sport_params)
      render json: @sport.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @sport.destroy
    if !@sport.destroyed?
      render json: @sport.errors, status: :unprocessable_entity
    end
  end

  private

  def set_sport
    @sport = Sport.find(params[:id])
  end

  def sport_params
    params.require(:sport).permit(:id, :name)
  end
end
