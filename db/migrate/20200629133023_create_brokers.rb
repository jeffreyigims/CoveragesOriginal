class CreateBrokers < ActiveRecord::Migration[5.2]
  def change
    create_table :brokers do |t|
      t.string :name
      # t.references :contact, foreign_key: true
      t.references :company, null: false, foreign_key: true

      t.timestamps
    end
  end
end
