class AddCoveragesToCoverageBrokers < ActiveRecord::Migration[5.2]
  def change
    add_reference :coverage_brokers, :coverage, null: false, foreign_key: true
  end
end
