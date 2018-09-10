defmodule GeekWeb.AdminControllerTest do
  use GeekWeb.ConnCase

  alias Geek.Admins

  @create_attrs %{account: "some account", password: "some pass"}
  @update_attrs %{account: "some updated account", password: "some updated pass"}
  @invalid_attrs %{account: nil, password: nil}

  def fixture(:admin) do
    {:ok, admin} = Admins.create_admin(@create_attrs)
    admin
  end

  describe "index" do
    test "index", %{conn: conn} do
      conn = get(conn, Routes.admin_path(conn, :index))
      assert html_response(conn, 200) =~ "Login Page"
    end
  end

  describe "list" do
    setup [:create_admin]

    test "unauthenticated", %{conn: conn} do
      conn = get(conn, Routes.admin_path(conn, :list))
      assert text_response(conn, 401) =~ "unauthenticated"
    end

    test "lists all admins", %{conn: conn} do
      conn = post(conn, Routes.admin_path(conn, :login), admin: @create_attrs)
      conn = get(conn, Routes.admin_path(conn, :list))
      assert html_response(conn, 200) =~ "Listing Admins"
    end
  end

  describe "new admin" do
    setup [:create_admin]

    test "unauthenticated", %{conn: conn} do
      conn = get(conn, Routes.admin_path(conn, :list))
      assert text_response(conn, 401) =~ "unauthenticated"
    end

    test "renders form", %{conn: conn} do
      conn = post(conn, Routes.admin_path(conn, :login), admin: @create_attrs)
      conn = get(conn, Routes.admin_path(conn, :new))
      assert html_response(conn, 200) =~ "New Admin"
    end
  end

  describe "create admin" do
    test "redirects to show when data is valid", %{conn: conn} do
      conn = post(conn, Routes.admin_path(conn, :create), admin: @create_attrs)
      assert %{id: id} = redirected_params(conn)
      conn = post(conn, Routes.admin_path(conn, :login), admin: @create_attrs)
      assert redirected_to(conn) == Routes.admin_path(conn, :list)

      conn = get(conn, Routes.admin_path(conn, :show, id))
      assert html_response(conn, 200) =~ "Show Admin"
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, Routes.admin_path(conn, :create), admin: @invalid_attrs)
      assert html_response(conn, 200) =~ "New Admin"
    end
  end

  describe "edit admin" do
    setup [:create_admin]

    test "unauthenticated", %{conn: conn} do
      conn = get(conn, Routes.admin_path(conn, :list))
      assert text_response(conn, 401) =~ "unauthenticated"
    end

    test "renders form for editing chosen admin", %{conn: conn, admin: admin} do
      conn = post(conn, Routes.admin_path(conn, :login), admin: @create_attrs)
      conn = get(conn, Routes.admin_path(conn, :edit, admin))
      assert html_response(conn, 200) =~ "Edit Admin"
    end
  end

  describe "update admin" do
    setup [:create_admin]

    test "unauthenticated", %{conn: conn} do
      conn = get(conn, Routes.admin_path(conn, :list))
      assert text_response(conn, 401) =~ "unauthenticated"
    end

    test "redirects when data is valid", %{conn: conn, admin: admin} do
      conn = post(conn, Routes.admin_path(conn, :login), admin: @create_attrs)
      conn = put(conn, Routes.admin_path(conn, :update, admin), admin: @update_attrs)
      conn = post(conn, Routes.admin_path(conn, :login), admin: @update_attrs)
      assert redirected_to(conn) == Routes.admin_path(conn, :list)

      conn = get(conn, Routes.admin_path(conn, :show, admin))
      assert html_response(conn, 200) =~ "some updated account"
    end

    test "renders errors when data is invalid", %{conn: conn, admin: admin} do
      conn = post(conn, Routes.admin_path(conn, :login), admin: @create_attrs)
      conn = put(conn, Routes.admin_path(conn, :update, admin), admin: @invalid_attrs)
      assert html_response(conn, 200) =~ "Edit Admin"
    end
  end

  describe "delete admin" do
    setup [:create_admin]

    test "unauthenticated", %{conn: conn} do
      conn = get(conn, Routes.admin_path(conn, :list))
      assert text_response(conn, 401) =~ "unauthenticated"
    end

    test "deletes chosen admin", %{conn: conn, admin: admin} do
      conn = post(conn, Routes.admin_path(conn, :login), admin: @create_attrs)
      conn = delete(conn, Routes.admin_path(conn, :delete, admin))
      assert redirected_to(conn) == Routes.admin_path(conn, :index)

      assert_error_sent(404, fn ->
        get(conn, Routes.admin_path(conn, :show, admin))
      end)
    end
  end

  defp create_admin(_) do
    admin = fixture(:admin)
    {:ok, admin: admin}
  end
end
