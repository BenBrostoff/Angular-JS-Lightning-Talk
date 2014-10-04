class CreateDays < ActiveRecord::Migration
  def change
    create_table :days do |t|
      t.date :day_of
      t.integer :code
      t.integer :fitness
      t.text :message

      t.timestamps
    end
  end
end
