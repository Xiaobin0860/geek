defmodule Geek.Admins.Admin do
  use Ecto.Schema
  import Ecto.Changeset
  alias Comeonin.Pbkdf2, as: PassHash

  schema "admins" do
    field(:account, :string)
    field(:passhash, :string)
    field(:password, :string, virtual: true)
  end

  @doc false
  def changeset(admin, attrs) do
    admin
    |> cast(attrs, [:account, :passhash, :password])
    |> validate_required([:account, :password])
    |> validate_length(:account, min: 3, max: 20)
    |> validate_length(:password, min: 3, max: 20)
    |> put_passhash()
  end

  def check_password(admin, password), do: PassHash.checkpw(password, admin.passhash)

  defp put_passhash(changeset) do
    case changeset do
      %Ecto.Changeset{valid?: true, changes: %{password: pass}} ->
        put_change(
          changeset,
          :passhash,
          PassHash.hashpwsalt(pass)
        )

      _ ->
        changeset
    end
  end
end
