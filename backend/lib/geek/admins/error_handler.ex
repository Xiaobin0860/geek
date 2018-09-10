defmodule Geek.Admins.ErrorHandler do
  import Plug.Conn
  import Phoenix.Controller, only: [get_format: 1]

  def auth_error(conn, {type, _reason}, _opts) do
    case get_format(conn) do
      "json" ->
        conn
        |> put_resp_content_type("application/json")
        |> send_resp(401, Poison.encode!(%{error: to_string(type)}))

      _ ->
        conn
        |> put_resp_content_type("text/plain")
        |> send_resp(401, to_string(type))
    end
  end
end
