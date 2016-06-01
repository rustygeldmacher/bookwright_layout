class PagesController < ApplicationController
  def show
    render json: page
  end

  private

  def page
    @page ||= Book.current.get_page(params[:id])
  end
end
