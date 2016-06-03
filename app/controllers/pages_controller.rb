class PagesController < ApplicationController
  def show
    render json: page
  end

  def update
    page.update(containers)
    book.save
    render nothing: 200
  end

  private

  def page
    @page ||= book.get_page(params[:id])
  end

  def book
    @book ||= Book.current
  end

  def containers
    params.permit!
    params[:containers]
  end
end
