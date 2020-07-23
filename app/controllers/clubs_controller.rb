class ClubsController < ApplicationController
    before_action :set_club, only: [:show, :update, :destroy]

    include Filterable
    include Orderable

    BOOLEAN_FILTERING_PARAMS = [[]]
    PARAM_FILTERING_PARAMS = [:for_league]
    ORDERING_PARAMS = []

    def index
      @clubs = boolean_filter(Club.alphabetical, BOOLEAN_FILTERING_PARAMS)
      @clubs = param_filter(@clubs, PARAM_FILTERING_PARAMS)
      @clubs = order(@clubs, ORDERING_PARAMS)
      respond_to do |format|
        format.html { @clubs }
        format.json { render json: ClubSerializer.new(@clubs).serializable_hash }
      end
    end
  
    def show 
      respond_to do |format|
        format.html { @clubs }
        format.json { render json: ClubSerializer.new(@club).serializable_hash }
      end
    end 
  
    def create
      @club = Club.new(club_params)
      if !@club.save
        render json: @club.errors, status: :unprocessable_entity
      end
    end
  
    def update
      if !@club.update(club_params)
        render json: @club.errors, status: :unprocessable_entity
      end
    end
  
    def destroy
      @club.destroy
      if !@club.destroyed?
        render json: @club.errors, status: :unprocessable_entity
      end
    end
  
    private
  
    def set_club
      @club = Club.find(params[:id])
    end
  
    def club_params
      params.require(:club).permit(:id, :name, :abbreviation, :league_id)
    end
  end
  