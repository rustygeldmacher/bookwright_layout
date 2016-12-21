namespace :images do
  desc 'Print the name and size of each image, in order'
  task :print => :environment do
    book = Book.current
    book.page_count.times do |page_number|
      page = book.get_page(page_number)
      images = page.xml.try(:css, 'image') || []
      images.each do |image_element|
        src = image_element.get('src')
        image = Image.find("images/#{src}")
        puts [image.filepath, image.filesize].join("\t")
      end
    end
  end
end
