class Book < ActiveRecord::Base
  self.table_name = 'Files'
  self.primary_key = 'filepath'

  before_save :set_filecontent
  before_save :set_file_size

  def self.current
    Book.find('bbf2.xml')
  end

  def page_count
    xml.css('page').count
  end

  def get_page(number)
    page_xml = xml.css("page[number=\"#{number}\"]").first
    Page.new(page_xml)
  end

  private

  def xml
    @xml ||= Oga.parse_xml(filecontent)
  end

  def set_filecontent
    self.filecontent = xml.to_xml.gsub("'", "''")
  end

  def set_file_size
    self.filesize = xml.to_xml.bytesize
  end
end
