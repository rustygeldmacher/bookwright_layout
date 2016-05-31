#!/usr/bin/env ruby

require 'sqlite3'
require 'oga'

db = SQLite3::Database.new "gemma.blurb"

book_row = db.execute("select * from Files where filepath='bbf2.xml'")[0]
book_xml = book_row[1]
book_size = book_row[2]

book = Oga.parse_xml(book_xml)

pages = book.css('page')
pages.each do |page|
  page_number = page.get('number').to_i
  # next if page_number <= 0
  next unless page_number == 3

  containers = page.css('container')
  puts containers.first.to_xml
  containers.first.set('x', '144.0')
  containers.first.set('y', '27.0')
  containers.first.set('width', '252.0')
  containers.first.set('height', '252.0')
end

#puts book.to_xml
xml_quoted = book.to_xml.gsub("'", "''")
db.execute("update Files set filecontent = '#{xml_quoted}', filesize = #{book.to_xml.bytesize} where filepath = 'bbf2.xml'")

