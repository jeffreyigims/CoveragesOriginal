class CompaniesController < ApplicationController
    before_action :set_company, only: [:show, :update, :destroy]
  
    include Filterable
    include Orderable

    BOOLEAN_FILTERING_PARAMS = [[]]
    PARAM_FILTERING_PARAMS = []
    ORDERING_PARAMS = []

    def index
      @companies = boolean_filter(Company.all, BOOLEAN_FILTERING_PARAMS)
      @companies = param_filter(@companies, PARAM_FILTERING_PARAMS)
      @companies = order(@companies, ORDERING_PARAMS)
      respond_to do |format|
        format.html { @companies }
        format.json { render json: CompanySerializer.new(@companies).serializable_hash }
      end
  end

  def show 
    respond_to do |format|
      format.html { @company }
      format.json { render json: CompanySerializer.new(@company).serializable_hash }
    end
  end 
  
    def create
      @company = Company.new(company_params)
      if !@company.save
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
      @company = Company.find(params[:id])
    end
  
    def company_params
      params.require(:company).permit(:id, :name)
    end
  end
  