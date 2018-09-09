defmodule Geek.AdminsTest do
  use Geek.DataCase

  alias Geek.Admins

  describe "admins" do
    alias Geek.Admins.Admin

    @valid_attrs %{account: "some account", password: "some pass"}
    @update_attrs %{account: "some updated account", password: "some updated pass"}
    @invalid_attrs %{account: nil, password: nil}

    def admin_fixture(attrs \\ %{}) do
      {:ok, admin} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Admins.create_admin()

      admin
    end

    test "list_admins/0 returns all admins" do
      a1 = admin_fixture()
      [a2] = Admins.list_admins()
      assert a1.account == a2.account
      assert true == Admin.check_password(a2, a1.password)
    end

    test "get_admin!/1 returns the admin with given id" do
      a1 = admin_fixture()
      a2 = Admins.get_admin!(a1.id)
      assert a1.account == a2.account
      assert true == Admin.check_password(a2, a1.password)
    end

    test "create_admin/1 with valid data creates a admin" do
      assert {:ok, %Admin{} = admin} = Admins.create_admin(@valid_attrs)
      assert admin.account == "some account"
      assert true == Admin.check_password(admin, @valid_attrs.password)
    end

    test "create_admin/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Admins.create_admin(@invalid_attrs)
    end

    test "update_admin/2 with valid data updates the admin" do
      admin = admin_fixture()
      assert {:ok, %Admin{} = admin} = Admins.update_admin(admin, @update_attrs)
      assert @update_attrs.account == admin.account
      assert true == Admin.check_password(admin, @update_attrs.password)
    end

    test "update_admin/2 with invalid data returns error changeset" do
      admin = admin_fixture()
      assert {:error, %Ecto.Changeset{}} = Admins.update_admin(admin, @invalid_attrs)
      assert true == Admin.check_password(admin, @valid_attrs.password)
    end

    test "delete_admin/1 deletes the admin" do
      admin = admin_fixture()
      assert {:ok, %Admin{}} = Admins.delete_admin(admin)
      assert_raise Ecto.NoResultsError, fn -> Admins.get_admin!(admin.id) end
    end

    test "change_admin/1 returns a admin changeset" do
      admin = admin_fixture()
      assert %Ecto.Changeset{} = Admins.change_admin(admin)
    end
  end
end
