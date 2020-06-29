class CreateLeagues < ActiveRecord::Migration[5.2]
  def change
    create_table :leagues do |t|
      t.string :name
      t.string :level
      t.references :sport, null: false, foreign_key: true

      t.timestamps
    end
  end
end
