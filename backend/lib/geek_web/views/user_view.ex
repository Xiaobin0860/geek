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
      nick: user.nick,
      avatar: user.avatar,
      gender: user.gender,
      phone: user.phone}
  end
end
