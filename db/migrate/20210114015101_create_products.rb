class CreateProducts < ActiveRecord::Migration[6.1]
  def change
    create_table :products do |t|
      t.string :product_name
      t.integer :amount
      t.string :price
      t.string :img
      t.timestamps


    end
  end
end
