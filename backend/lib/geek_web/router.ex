defmodule GeekWeb.Router do
  use GeekWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", GeekWeb do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  scope "/wx", GeekWeb do
    pipe_through :browser # Use the default browser stack

    resources "/admins", AdminController
  end

  # Other scopes may use custom stacks.
  scope "/wx/api", GeekWeb do
    pipe_through :api
    
    resources "/users", UserController, except: [:new, :edit]
    post "/login", WxController, :login
    post "/update", WxController, :update
  end
end
