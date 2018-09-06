defmodule GeekWeb.WxController do
  use GeekWeb, :controller

  alias Geek.Accounts
  alias Geek.Accounts.User
  require Logger

  action_fallback(GeekWeb.FallbackController)

  def login(conn, %{"code" => code}) do
    response =
      HTTPotion.get(
        "https://api.weixin.qq.com/sns/jscode2session?appid=wx343f06195860bc6e&secret=a337c097d43a4e2b67b58123f49210ba&grant_type=authorization_code&js_code=" <>
          code
      )

    Logger.debug(inspect(response))
    %{"openid" => openid} = Jason.decode!(response.body)

    user =
      case Accounts.get_user_by_openid(openid) do
        nil ->
          {:ok, %User{} = user} = Accounts.create_user(%{openid: openid})
          user

        user ->
          user
      end

    render(conn, "login.json", user: user)
  end

  def update(conn, %{"id" => id, "user" => attrs}) do
    user = Accounts.get_user!(id)

    with {:ok, %User{} = user} <- Accounts.update_user(user, attrs) do
      render(conn, "show.json", user: user)
    end
  end
end
