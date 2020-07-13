class GroupsController < ApplicationController
    before_action :set_group, only: [:update, :show, :destroy]
  
    def index
      @groups = Group.all
      respond_to do |format|
        format.html { @groups }
        format.json { render json: GroupSerializer.new(@groups).serializable_hash }
      end
    end
  
    def show 
      respond_to do |format|
        format.html { @group }
        format.json { @group }
      end
    end 
  
    def create
      @group = League.new(group_params)
      if @group.save
        render json: @group
      else
        render json: @group.errors, status: :unprocessable_entity
      end
    end
  
    def update
      if !@group.update(group_params)
        render json: @group.errors, status: :unprocessable_entity
      end
    end
  
    def destroy
      @group.destroy
      if !@group.destroyed?
        render json: @group.errors, status: :unprocessable_entity
      end
    end
  
    private
  
    def set_group
      @group = League.find(params[:id])
    end
  
    def group_params
      params.require(:group).permit(:id, :name)
    end
  end
  