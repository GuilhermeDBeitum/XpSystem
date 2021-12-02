class SalesController < ApplicationController
    before_action :set_sale, only: [:show, :update, :destroy]

    skip_before_action :verify_authenticity_token
  
    # GET /sales
    # GET /sales.json
    def index
      @sales = Sale.all
      render json: @sales 
    end
  
    # GET /sales/1
    # GET /sales/1.json
    def show
      @sale = Sale.find(params[:id])
      render json: { data: @sale, status: :ok, message: 'Success' }
    end
  
    # GET /sales/new
    def new
      @sale = Sale.new
    end
  
    # GET /sales/1/edit
    def edit
    end
  
    # POST /sales
    # POST /sales.json
    def create
      @sale = Sale.new(sale_params)
      if @sale.save
        render json: { status: :ok, message: 'Success Saved' }
      else
        render json: { json: @sale.errors, status: :unprocessable_entity }
      end
    end
  
    # PATCH/PUT /sales/1
    # PATCH/PUT /sales/1.json
    def update
      @sale = Sale.find(params[:id])
      if @sale.update(sale_params)
        render json: { status: :ok, message: 'Success Updated' }
      else
        render json: { json: @sale.errors, status: :unprocessable_entity }
      end
    end
  
    # DELETE /sales/1
    # DELETE /sales/1.json
    def destroy
      @sale = Sale.find(params[:id])
      if @sale.destroy
        render json: { json: 'Success Deleted'}
      else
        render json: { json: @sale.errors, status: :unprocessable_entity }
      end
    end
  
    private
      # Use callbacks to share common setup or constraints between actions.
      def set_sale
        @sale = Sale.find(params[:id])
      end
  
      # Only allow a list of trusted parameters through.
      def sale_params
        params.require(:sale).permit(:id, :seller_name,:product_name, :amount, :price, :total)
      end
  end

