class LeaguesController < ApplicationController
  before_action :set_league, only: [:update, :show, :destroy]

  def index
    @leagues = League.all
    respond_to do |format|
      format.html { @leagues }
      format.json { render json: LeagueSerializer.new(@leagues).serializable_hash }
    end
  end

  def show 
    respond_to do |format|
      format.html { @league }
      format.json { render json: LeagueSerializer.new(@league).serializable_hash }
    end
  end 

  def create
    @league = League.new(league_params)
    if @league.save
      render json: @league
    else
      render json: @league.errors, status: :unprocessable_entity
    end
  end

  def update
    if !@league.update(league_params)
      render json: @league.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @league.destroy
    if !@league.destroyed?
      render json: @league.errors, status: :unprocessable_entity
    end
  end

  private

  def set_league
    @league = League.find(params[:id])
  end

  def league_params
    params.require(:league).permit(:id, :name, :level, :sport_id)
  end
end
