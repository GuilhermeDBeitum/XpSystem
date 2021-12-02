class CreateSales < ActiveRecord::Migration[6.1]
  def change
    create_table :sales do |t|
      t.string :seller_name
      t.string :product_name
      t.integer :amount
      t.float :price
      t.float :total

      t.timestamps
    end
  end
end
