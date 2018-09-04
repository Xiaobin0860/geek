defmodule Geek.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset


  schema "users" do
    field :account, :string
    field :avatar, :string
    field :gender, :integer
    field :nick, :string
    field :openid, :string
    field :passhash, :string
    field :phone, :string
    field :uuid, :string

  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:openid, :account, :passhash, :uuid, :nick, :phone, :gender, :avatar])
    |> validate_required([:openid])
  end
end
