class Page
  attr_reader :xml

  def initialize(xml)
    @xml = xml
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
