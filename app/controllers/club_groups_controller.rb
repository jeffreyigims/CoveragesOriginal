class ClubGroupsController < ApplicationController
    before_action :set_club_group, only: [:update, :show, :destroy]

    def index
      @club_groups = ClubGroup.all
      respond_to do |format|
        format.html { @club_groups }
        format.json { @club_groups }
      end
    end
  
    def show 
      respond_to do |format|
        format.html { @club_group }
        format.json { render json: ClubGroupSerializer.new(@club_group).serializable_hash }
      end
    end 
  
    def create
      @club_group = ClubGroup.new(club_group_params)
      if @club_group.save
        render json: @club_group
      else
        render json: @club_group.errors, status: :unprocessable_entity
      end
    end
  
    def update
      if !@club_group.update(club_group_params)
        render json: @club_group.errors, status: :unprocessable_entity
      end
    end
  
    def destroy
      @club_group.destroy
      if !@club_group.destroyed?
        render json: @club_group.errors, status: :unprocessable_entity
      end
    end
  
    private
  
    def set_club_group
      @club_group = ClubGroup.find(params[:id])
    end
  
    def club_group_params
      params.require(:club_group).permit(:id, :club_id, :group_id)
    end
  end
  