class AddCoveragesToCoverageCarriers < ActiveRecord::Migration[5.2]
  def change
    add_reference :coverage_carriers, :coverage, null: false, foreign_key: true
  end
end
