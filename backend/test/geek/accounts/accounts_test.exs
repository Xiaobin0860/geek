defmodule Geek.AccountsTest do
  use Geek.DataCase

  alias Geek.Accounts

  describe "users" do
    alias Geek.Accounts.User

    @valid_attrs %{avatar: "some avatar", gender: 42, nick: "some nick", openid: "some openid", phone: "some phone"}
    @update_attrs %{avatar: "some updated avatar", gender: 43, nick: "some updated nick", openid: "some updated openid", phone: "some updated phone"}
    @invalid_attrs %{avatar: nil, gender: nil, nick: nil, openid: nil, phone: nil}

    def user_fixture(attrs \\ %{}) do
      {:ok, user} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Accounts.create_user()

      user
    end

    test "list_users/0 returns all users" do
      user = user_fixture()
      assert Accounts.list_users() == [user]
    end

    test "get_user!/1 returns the user with given id" do
      user = user_fixture()
      assert Accounts.get_user!(user.id) == user
    end

    test "create_user/1 with valid data creates a user" do
      assert {:ok, %User{} = user} = Accounts.create_user(@valid_attrs)
      assert user.avatar == "some avatar"
      assert user.gender == 42
      assert user.nick == "some nick"
      assert user.openid == "some openid"
      assert user.phone == "some phone"
      assert user == Accounts.get_user_by_openid(user.openid)
    end

    test "create_user/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Accounts.create_user(@invalid_attrs)
    end

    test "update_user/2 with valid data updates the user" do
      user = user_fixture()
      assert {:ok, %User{} = user} = Accounts.update_user(user, @update_attrs)
      
      assert user.avatar == "some updated avatar"
      assert user.gender == 43
      assert user.nick == "some updated nick"
      assert user.openid == "some updated openid"
      assert user.phone == "some updated phone"
      assert nil == Accounts.get_user_by_openid(@valid_attrs.openid)
    end

    test "update_user/2 with invalid data returns error changeset" do
      user = user_fixture()
      assert {:error, %Ecto.Changeset{}} = Accounts.update_user(user, @invalid_attrs)
      assert user == Accounts.get_user!(user.id)
    end

    test "delete_user/1 deletes the user" do
      user = user_fixture()
      assert {:ok, %User{}} = Accounts.delete_user(user)
      assert_raise Ecto.NoResultsError, fn -> Accounts.get_user!(user.id) end
    end

    test "change_user/1 returns a user changeset" do
      user = user_fixture()
      assert %Ecto.Changeset{} = Accounts.change_user(user)
    end
  end
end
