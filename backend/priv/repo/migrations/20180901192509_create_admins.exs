defmodule Geek.Repo.Migrations.CreateAdmins do
  use Ecto.Migration

  def change do
    create table(:admins) do
      add :account, :string
      add :passhash, :string

    end

  end
end
