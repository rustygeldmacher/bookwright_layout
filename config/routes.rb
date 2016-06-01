Rails.application.routes.draw do
  resources :books do
    resources :pages
  end
end
