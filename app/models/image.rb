class Image < ActiveRecord::Base
  self.table_name = 'Files'
  self.primary_key = 'filepath'

  def self.default_scope
    where("filepath like 'images/%'")
  end
end
