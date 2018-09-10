defmodule Geek.Admins.Pipeline do
  use Guardian.Plug.Pipeline,
    otp_app: :geek,
    error_handler: Geek.Admins.ErrorHandler,
    module: Geek.Admins.Guardian

  # If there is a session token, validate it
  plug(Guardian.Plug.VerifySession, realm: "Bearer")
  # If there is an authorization header, validate it
  plug(Guardian.Plug.VerifyHeader, realm: "Bearer")
  # Load the user if either of the verifications worked
  plug(Guardian.Plug.LoadResource, allow_blank: true)
end
