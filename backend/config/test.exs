use Mix.Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :geek, GeekWeb.Endpoint,
  http: [port: 4021],
  static_url: [path: "/wx"],
  server: false

# Print only warnings and errors during test
config :logger, level: :warn

# Configure your database
config :geek, Geek.Repo,
  username: "geek",
  password: "keeg",
  database: "geek_test",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox
