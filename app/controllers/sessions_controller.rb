class SessionsController < ApplicationController
  def create
    user = User.authenticate(params["user"][:username], params["user"][:password])
    if user
      session[:user_id] = user.id
      if current_user.role?(:admin) 
        redirect_to admin_dashboard_path, notice: "Logged in!"
      elsif current_user.role?(:contact) 
        redirect_to contact_dashboard_path, notice: "Logged in!"
      end
    else
      flash.now.alert = "Username and/or password is invalid"
      render "new"
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to login_path, notice: "Logged out!"
  end
end
