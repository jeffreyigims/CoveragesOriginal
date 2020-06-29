class CreateClubContacts < ActiveRecord::Migration[5.2]
  def change
    create_table :club_contacts do |t|
      t.date :start_date
      t.date :end_date
      t.string :notes
      t.boolean :active
      t.references :contact, null: false, foreign_key: true
      t.references :club, null: false, foreign_key: true

      t.timestamps
    end
  end
end
