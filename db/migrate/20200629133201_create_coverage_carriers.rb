class CreateCoverageCarriers < ActiveRecord::Migration[5.2]
  def change
    create_table :coverage_carriers do |t|
      t.references :carrier, null: false, foreign_key: true

      t.timestamps
    end
  end
end
