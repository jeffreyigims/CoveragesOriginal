class CreateUserClubs < ActiveRecord::Migration[5.2]
  def change
    create_table :user_clubs do |t|
      t.references :club
      t.references :user

      t.timestamps
    end
  end
end
