defmodule Geek.Repo.Migrations.CreateAdmins do
  use Ecto.Migration

  def change do
    create table(:admins) do
      add :account, :string, null: false, default: ""
      add :passhash, :string, null: false, default: ""

    end

    create unique_index(:admins, [:account])
  end
end
