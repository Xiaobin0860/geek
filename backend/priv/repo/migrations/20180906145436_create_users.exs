defmodule Geek.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :openid, :string, null: false, default: ""
      add :nick, :string, null: false, default: ""
      add :avatar, :string, null: false, default: ""
      add :gender, :integer, null: false, default: 0
      add :phone, :string, null: false, default: ""

    end

    create unique_index(:users, [:openid])
  end
end
