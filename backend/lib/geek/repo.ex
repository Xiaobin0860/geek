defmodule Geek.Repo do
  use Ecto.Repo,
    otp_app: :geek,
    adapter: Ecto.Adapters.MySQL
end
