class UserClubsController < ApplicationController
    before_action :set_user_club, only: [:update, :destroy]
  
    # include Filterable
    # include Orderable
  
    # BOOLEAN_FILTERING_PARAMS = [[]]
    # PARAM_FILTERING_PARAMS = []
    # ORDERING_PARAMS = []
  
    # def index
    #   @users = boolean_filter(User.all, BOOLEAN_FILTERING_PARAMS)
    #   @users = param_filter(@users, PARAM_FILTERING_PARAMS)
    #   @users = order(@users, ORDERING_PARAMS)
    #   respond_to do |format|
    #     format.html { @users }
    #     format.json { render json: UserSerializer.new(@users).serializable_hash }
    #   end
    # end
  
    # def show
    #   respond_to do |format|
    #     format.html { @user_club }
    #     format.json { render json: UserSerializer.new(@user_club).serializable_hash }
    #   end
    # end
  
    def create
      @user_club = UserClub.new(user_club_params)
      if !@user_club.save
        render json: @user_club.errors, status: :unprocessable_entity
      end
    end
  
    def update
      if !@user_club.update(user_club_params)
        render json: @user_club.errors, status: :unprocessable_entity
      end
    end
  
    def destroy
      @user_club.destroy
      if !@user_club.destroyed?
        render json: @user_club.errors, status: :unprocessable_entity
      end
    end
  
    private
  
    def set_user_club
      @user_club = UserClub.find(params[:id])
    end
  
    def user_club_params
      params.require(:user_club).permit(:id, :active, :user_id, :club_id)
    end
  end
  