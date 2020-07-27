class DashboardsController < ApplicationController
  def admin_dashboard
    @coveragesRecent = Coverage.most_recent.paginate(page: params[:pageRecent]).per_page(5)
    @coveragesUnverified = Coverage.unverified.most_recent.paginate(page: params[:pageUnverified]).per_page(5)
    respond_to do |format|
      format.html { @coveragesRecent }
      format.json {
        render json: {
          pageRecent: @coveragesRecent.current_page,
          pagesRecent: @coveragesRecent.total_pages,
          coveragesRecent: CoverageSerializer.new(@coveragesRecent).serializable_hash,
          pageUnverified: @coveragesUnverified.current_page,
          pagesUnverified: @coveragesUnverified.total_pages,
          coveragesUnverified: CoverageSerializer.new(@coveragesUnverified).serializable_hash,
        }
      }
    end
  end
end
