# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :geek,
  ecto_repos: [Geek.Repo]

# Configures the endpoint
config :geek, GeekWeb.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "FArM5Dd0M1MbCBXI1WO57R2tZzs5Ghk+7Z9X0mn2l/XbYzZkVKIAYsTQaSN2FBdq",
  render_errors: [view: GeekWeb.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Geek.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Use Jason for JSON parsing in Phoenix and Ecto
config :phoenix, :json_library, Jason
config :ecto, :json_library, Jason


# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"

import_config "secret.exs"
