class SessionsController < ApplicationController
  def create
    user = User.authenticate(params["user"][:username], params["user"][:password])
    if user
      session[:user_id] = user.id
      if current_user.role?(:admin)
        redirect_to home_path, notice: "Logged in!"
      end
    else
      flash.now.alert = "Username and/or password is invalid"
      render "new"
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to home_path, notice: "Logged out!"
  end
end
