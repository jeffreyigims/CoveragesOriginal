class AddUserToCoverage < ActiveRecord::Migration[5.2]
  def change
    add_reference :coverages, :user, null: false, foreign_key: true
  end
end
