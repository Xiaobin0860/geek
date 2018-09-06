defmodule Geek.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset


  schema "users" do
    field :avatar, :string, default: ""
    field :gender, :integer, default: 0
    field :nick, :string, default: ""
    field :openid, :string, default: ""
    field :phone, :string, default: ""

  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:openid, :nick, :avatar, :gender, :phone])
    |> validate_required([:openid])
    |> unique_constraint(:openid)
  end
end
