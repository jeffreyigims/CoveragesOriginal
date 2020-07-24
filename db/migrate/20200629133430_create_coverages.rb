class CreateCoverages < ActiveRecord::Migration[5.2]
  def change
    create_table :coverages do |t|
      t.boolean :has_coverage_line
      t.string :notes
      t.date :start_date
      t.date :end_date
      t.boolean :verified
      t.references :club_group, null: false, foreign_key: true
      t.references :sub_category, null: false, foreign_key: true
      t.timestamps
    end
  end
end
