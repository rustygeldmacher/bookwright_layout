class PagesController < ApplicationController
  def show
    render json: page
  end

  def update
    render nothing: 200
  end

  private

  def page
    @page ||= Book.current.get_page(params[:id])
  end
end
