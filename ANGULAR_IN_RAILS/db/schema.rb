# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20141004010044) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "bookmarks", force: true do |t|
    t.integer  "user_id"
    t.integer  "book_id"
    t.integer  "position_begin"
    t.integer  "position_end"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "bookmarks", ["book_id"], name: "index_bookmarks_on_book_id", using: :btree
  add_index "bookmarks", ["user_id"], name: "index_bookmarks_on_user_id", using: :btree

  create_table "books", force: true do |t|
    t.string   "title"
    t.text     "content"
    t.integer  "user_id"
    t.boolean  "universal",  default: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "books", ["user_id"], name: "index_books_on_user_id", using: :btree

  create_table "comments", force: true do |t|
    t.text     "commentary"
    t.integer  "user_id"
    t.integer  "book_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.text     "commented_on"
  end

  add_index "comments", ["book_id"], name: "index_comments_on_book_id", using: :btree
  add_index "comments", ["user_id"], name: "index_comments_on_user_id", using: :btree

  create_table "days", force: true do |t|
    t.date     "day_of"
    t.integer  "code"
    t.integer  "fitness"
    t.text     "message"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "sentences", force: true do |t|
    t.text     "content"
    t.integer  "book_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "user_books", force: true do |t|
    t.integer  "farthest_point", default: 0
    t.integer  "user_id"
    t.integer  "book_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "name"
    t.string   "email"
    t.string   "password_digest"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
