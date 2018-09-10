defmodule GeekWeb.Router do
  use GeekWeb, :router

  pipeline :browser do
    plug(:accepts, ["html"])
    plug(:fetch_session)
    plug(:fetch_flash)
    plug(:protect_from_forgery)
    plug(:put_secure_browser_headers)
  end

  pipeline :api do
    plug(:accepts, ["json"])
  end

  pipeline :auth do
    plug(Geek.Admins.Pipeline)
  end

  pipeline :ensure_auth do
    plug(Guardian.Plug.EnsureAuthenticated)
  end

  scope "/", GeekWeb do
    # Use the default browser stack
    pipe_through(:browser)

    get("/", PageController, :index)
  end

  scope "/admins", GeekWeb do
    # Use the default browser stack
    pipe_through([:browser, :auth])

    get("/", AdminController, :index)
    post("/", AdminController, :create)
    post("/login", AdminController, :login)
    post("/logout", AdminController, :logout)
  end

  scope "/admins", GeekWeb do
    # Use the default browser stack
    pipe_through([:browser, :auth, :ensure_auth])

    get("/list", AdminController, :list)
    resources("/", AdminController, except: [:index, :create])
  end

  # Other scopes may use custom stacks.
  scope "/wx/api", GeekWeb do
    pipe_through(:api)

    resources("/users", UserController, except: [:new, :edit])
    post("/login", WxController, :login)
    post("/update", WxController, :update)
  end

  scope "/api", GeekWeb do
    pipe_through([:api, :auth])

    post("/admins/login", AdminController, :login)
    post("/admins/logout", AdminController, :logout)
  end

  scope "/api", GeekWeb do
    pipe_through([:api, :auth, :ensure_auth])

    post("/admins/info", AdminController, :info)
    get("/admins/:id", AdminController, :show)
  end
end
