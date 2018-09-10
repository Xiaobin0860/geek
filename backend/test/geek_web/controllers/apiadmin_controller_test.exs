defmodule GeekWeb.ApiAdminControllerTest do
  use GeekWeb.ConnCase

  alias Geek.Admins
  require Logger

  @create_attrs %{account: "some account", password: "some pass"}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  def fixture(:admin) do
    {:ok, admin} = Admins.create_admin(@create_attrs)
    admin
  end

  describe "api admin" do
    setup [:create_admin]

    test "unauthenticated", %{conn: conn} do
      conn =
        conn
        |> put_req_header("content-type", "application/json")
        |> get("/api/admins/1")

      assert %{"error" => "unauthenticated"} = json_response(conn, 401)
    end

    test "show", %{conn: conn} do
      rc =
        conn
        |> post("/api/admins/login", admin: @create_attrs)

      assert %{"data" => %{"jwt" => jwt, "id" => id}} = json_response(rc, 200)
      Logger.debug("jwt=#{jwt}, id=#{id}")

      rc =
        conn
        |> put_req_header("authorization", "bearer: " <> jwt)
        |> get("/api/admins/" <> to_string(id))

      assert %{"data" => %{"account" => _, "id" => ^id}} = json_response(rc, 200)

      rc =
        conn
        |> put_req_header("authorization", "bearer: " <> jwt)
        |> post("/api/admins/info")

      assert %{"data" => %{"account" => _, "id" => ^id}} = json_response(rc, 200)

      rc =
        conn
        |> put_req_header("authorization", "bearer: " <> jwt)
        |> post("/api/admins/logout")

      assert %{"data" => %{"account" => _, "id" => ^id}} = json_response(rc, 200)

      # rc =
      #   conn
      #   |> put_req_header("authorization", "bearer: " <> jwt)
      #   |> get("/api/admins/" <> to_string(id))

      # assert %{"error" => "unauthenticated"} = json_response(rc, 401)

      # rc =
      #   conn
      #   |> put_req_header("authorization", "bearer: " <> jwt)
      #   |> post("/api/admins/info")

      # assert %{"error" => "unauthenticated"} = json_response(rc, 401)
    end
  end

  defp create_admin(_) do
    admin = fixture(:admin)
    {:ok, admin: admin}
  end
end
