class Page
  attr_reader :xml

  def initialize(xml)
    @xml = xml
  end

  def page_number
    xml.get('number').to_i
  end

  def update(container_json)
    container_json.each do |container|
      container_xml = xml.css("container[id=\"#{container['id']}\"]").first
      %w[x y width height].each do |attribute|
        container_xml.set(attribute, container[attribute].to_s)
      end
    end
  end

  def as_json(options = {})
    # Margins in units of pixels, 36 pixels = 1/2 inch
    {
      # Original page: 8.5" x 10" mapped to a 12x12 book
      # margins: {
      #   top: 36,
      #   right: page_number.even? ? 144 : 108,
      #   bottom: 36,
      #   left: page_number.even? ? 108 : 144
      # },

      # Original page: 9.875" x 11" mapped to a 12x12 book
      margins: {
        top: 18,
        right: page_number.even? ? 117 : 36,
        bottom: 18,
        left: page_number.even? ? 36 : 117
      },

      containers: xml.css('container').map do |container|
        {
          id: container.get('id'),
          type: container.get('type'),
          x: container.get('x'),
          y: container.get('y'),
          width: container.get('width'),
          height: container.get('height')
        }
      end
    }
  end
end
