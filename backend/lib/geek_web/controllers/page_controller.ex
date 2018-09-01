defmodule GeekWeb.PageController do
  use GeekWeb, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
