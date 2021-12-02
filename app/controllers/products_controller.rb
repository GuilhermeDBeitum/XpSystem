class ProductsController < ApplicationController
  before_action :set_Product, only: [:show, :update, :destroy]

  skip_before_action :verify_authenticity_token

  # GET /products
  # GET /products.json
  def index
    @products = Product.all
    render json: @products 
  end

  # GET /products/1
  # GET /products/1.json
  def show
    @Product = Product.find(params[:id])
    render json: { data: @Product, status: :ok, message: 'Success' }
  end

  # GET /products/new
  def new
    @Product = Product.new
  end

  # GET /products/1/edit
  def edit
  end

  # POST /products
  # POST /products.json
  def create
    @Product = Product.new(product_params)
    if @Product.save
      render json: { status: :ok, message: 'Success Saved' }
    else
      render json: { json: @Product.errors, status: :unprocessable_entity }
    end
  end

  # PATCH/PUT /products/1
  # PATCH/PUT /products/1.json
  def update
    @Product = Product.find(params[:id])
    if @Product.update(product_params)
      render json: { status: :ok, message: 'Success Updated' }
    else
      render json: { json: @Product.errors, status: :unprocessable_entity }
    end
  end

  # DELETE /products/1
  # DELETE /products/1.json
  def destroy
    @Product = Product.find(params[:id])
    if @Product.destroy
      render json: { json: 'Success Deleted'}
    else
      render json: { json: @Product.errors, status: :unprocessable_entity }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_Product
      @product = Product.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def product_params
      params.require(:product).permit(:id, :product_name, :amount, :price, :img)
    end
end
