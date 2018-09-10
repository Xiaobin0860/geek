defmodule GeekWeb.AdminView do
  use GeekWeb, :view
  alias GeekWeb.AdminView

  def render("login.json", %{token: token, admin: admin}) do
    %{data: %{"jwt" => token, "id" => admin.id}}
  end

  def render("logout.json", %{admin: admin}) do
    %{data: render_one(admin, AdminView, "admin.json")}
  end

  def render("show.json", %{admin: admin}) do
    %{data: render_one(admin, AdminView, "admin.json")}
  end

  def render("admin.json", %{admin: admin}) do
    %{id: admin.id, account: admin.account}
  end
end
