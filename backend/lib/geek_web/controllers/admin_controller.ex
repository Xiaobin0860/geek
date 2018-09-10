defmodule GeekWeb.AdminController do
  use GeekWeb, :controller

  alias Geek.Admins
  alias Geek.Admins.Admin
  alias Geek.Admins.Guardian
  require Logger

  def index(conn, _p) do
    changeset = Admins.change_admin(%Admin{})
    maybe_admin = Guardian.Plug.current_resource(conn)

    message =
      if maybe_admin != nil do
        maybe_admin.account <> " is logged in"
      else
        "No one is logged in"
      end

    conn
    |> put_flash(:info, message)
    |> render("index.html",
      changeset: changeset,
      action: Routes.admin_path(conn, :login),
      maybe_admin: maybe_admin
    )
  end

  def list(conn, _params) do
    admins = Admins.list_admins()
    render(conn, "list.html", admins: admins)
  end

  def new(conn, _params) do
    changeset = Admins.change_admin(%Admin{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"admin" => admin_params}) do
    case Admins.create_admin(admin_params) do
      {:ok, admin} ->
        conn
        |> put_flash(:info, "Admin created successfully.")
        |> redirect(to: Routes.admin_path(conn, :show, admin))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    admin = Admins.get_admin!(id)
    render(conn, "show.html", admin: admin)
  end

  def edit(conn, %{"id" => id}) do
    admin = Admins.get_admin!(id)
    changeset = Admins.change_admin(admin)
    render(conn, "edit.html", admin: admin, changeset: changeset)
  end

  def update(conn, %{"id" => id, "admin" => admin_params}) do
    admin = Admins.get_admin!(id)

    case Admins.update_admin(admin, admin_params) do
      {:ok, admin} ->
        conn
        |> put_flash(:info, "Admin updated successfully.")
        |> redirect(to: Routes.admin_path(conn, :show, admin))

      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", admin: admin, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    admin = Admins.get_admin!(id)
    {:ok, _admin} = Admins.delete_admin(admin)

    conn
    |> put_flash(:info, "Admin deleted successfully.")
    |> redirect(to: Routes.admin_path(conn, :list))
  end

  def login(conn, %{"admin" => %{"account" => account, "password" => password}}) do
    Logger.debug("#{account} login")
    {:ok, admin} = Admins.auth(account, password)
    Logger.debug("#{admin.account} auth ok")

    conn
    |> put_flash(:success, "Welcom back!")
    |> Guardian.Plug.sign_in(admin)
    |> redirect(to: Routes.admin_path(conn, :list))
  end

  def logout(conn, _) do
    conn
    |> Guardian.Plug.sign_out()
    |> redirect(to: Routes.admin_path(conn, :index))
  end
end
