defmodule GeekWeb.UserView do
  use GeekWeb, :view
  alias GeekWeb.UserView

  def render("index.json", %{users: users}) do
    %{data: render_many(users, UserView, "user.json")}
  end

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{id: user.id,
      openid: user.openid,
      account: user.account,
      passhash: user.passhash,
      uuid: user.uuid,
      nick: user.nick,
      phone: user.phone,
      gender: user.gender,
      avatar: user.avatar}
  end
end
