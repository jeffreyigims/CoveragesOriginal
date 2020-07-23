class ClubGroupsController < ApplicationController
  before_action :set_club_group, only: [:destroy]

  include Filterable
  include Orderable

  BOOLEAN_FILTERING_PARAMS = [[]]
  PARAM_FILTERING_PARAMS = []
  ORDERING_PARAMS = []

  def index
    @club_groups = boolean_filter(ClubGroup.alphabetical, BOOLEAN_FILTERING_PARAMS)
    @club_groups = param_filter(@club_groups, PARAM_FILTERING_PARAMS)
    @club_groups = order(@club_groups, ORDERING_PARAMS)
    respond_to do |format|
      format.html { @club_groups }
      format.json { @club_groups }
    end
  end

  def create
    @club_group = ClubGroup.new(club_group_params)
    if !@club_group.save
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
