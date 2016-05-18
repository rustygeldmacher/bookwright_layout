class PagesController < ApplicationController
  helper_method :page

  def show
  end

  private

  def page
    @page ||= Book.current.get_page(params[:id])
  end
end
