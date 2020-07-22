class CreateCoverageBrokers < ActiveRecord::Migration[5.2]
  def change
    create_table :coverage_brokers do |t|
      t.references :broker, null: false, foreign_key: true

      t.timestamps
    end
  end
end
