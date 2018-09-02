defmodule Geek.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :openid, :string
      add :account, :string
      add :passhash, :string
      add :uuid, :string
      add :nick, :string
      add :phone, :string
      add :gender, :integer
      add :avatar, :string

    end

  end
end
