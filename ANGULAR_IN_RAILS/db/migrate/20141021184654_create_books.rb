class CreateBooks < ActiveRecord::Migration
  def change
    create_table :books do |t|
      t.string :title
      t.string :author
      t.integer :time_reading #minutes
      t.belongs_to :day

      t.timestamps
    end
  end
end
