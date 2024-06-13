CREATE TABLE usuario (
  id serial PRIMARY KEY,
  nome varchar(255),
  email varchar(255) NOT NULL UNIQUE,
  id_usuario_supabase uuid NOT NULL
)

CREATE TABLE treino(
  id serial PRIMARY KEY,
  id_usuario int NOT NULL,
  nome varchar(255) NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id)
)