class HomeController < ApplicationController
  def index
  end

  def metrics 
  end 

  def add_coverage 
  end 

  def search 
    redirect_back(fallback_location: home_path) if params[:query].blank?
    puts params
    @query = params[:query]
    @clubs = Club.search(@query)
    @total_hits = @clubs.size
    if @total_hits == 1 
      redirect_to @clubs.first, notice: "Search found one club."
    end
  end 
end
