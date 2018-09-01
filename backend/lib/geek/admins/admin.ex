defmodule Geek.Admins.Admin do
  use Ecto.Schema
  import Ecto.Changeset


  schema "admins" do
    field :account, :string
    field :passhash, :string

  end

  @doc false
  def changeset(admin, attrs) do
    admin
    |> cast(attrs, [:account, :passhash])
    |> validate_required([:account, :passhash])
  end
end
