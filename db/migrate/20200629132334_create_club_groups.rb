class CreateClubGroups < ActiveRecord::Migration[5.2]
  def change
    create_table :club_groups do |t|
      t.references :club, null: false, foreign_key: true
      t.references :group, null: false, foreign_key: true

      t.timestamps
    end
  end
end
