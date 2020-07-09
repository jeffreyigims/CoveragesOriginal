class CompaniesController < ApplicationController
    before_action :set_company, only: [:update, :destroy]
  
    def index
      @companies = Company.all
      respond_to do |format|
        format.html { @companies }
        format.json { @companies }
      end
    end
  
    def create
      @company = Company.new(company_params)
      if @company.save
        render json: @company
      else
        render json: @company.errors, status: :unprocessable_entity
      end
    end
  
    def update
      if !@company.update(company_params)
        render json: @company.errors, status: :unprocessable_entity
      end
    end
  
    def destroy
      @company.destroy
      if !@company.destroyed?
        render json: @company.errors, status: :unprocessable_entity
      end
    end
  
    private
  
    def set_company
      @company = Sport.find(params[:id])
    end
  
    def company_params
      params.require(:company).permit(:id, :name)
    end
  end
  