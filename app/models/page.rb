class Page
  attr_reader :xml

  def initialize(xml)
    @xml = xml
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
    {
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
