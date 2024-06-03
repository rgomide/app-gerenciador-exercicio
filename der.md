``` mermaid
erDiagram
    user ||--o{ desempenho : id
    user ||--o{ usuario_exercicio : id
    user ||--o{ treino: id
    user {
        serial id PK
        string nome_usuario
        string email
        string senha
        int qtde_seguidores
        int qtde_seguindo
    }


    rotina ||--o{ serie : id
    rotina {
        serial id PK
        int id_treino FK
        string nome_rotina
        string tipo_rotina  
    }

    extrato_rotina }|--|| rotina: id
    extrato_rotina {
        serial id PK
        int id_rotina FK
        timestamp duracao
        datetime inicio
        datetime fim
    }

    treino ||--o{ rotina: id
    treino {
        serial id PK
        int id_usuario FK
        varchar(255) nome
    }

    desempenho }|--|| exercicio : id
    desempenho }|--|| serie: id
    desempenho{
        int id PK
        int id_usuario FK
        int id_exercicio FK
        int id_serie FK
        float carga
        int repeticoes
        float volume
        datetime data
        
    }

    exercicio ||--|{ serie : id
    exercicio ||--o{ usuario_exercicio : id
    exercicio{
        serial id PK
        string nome
        string tipo
        string musculo
        boolean global
    }

    serie {
        serial id PK
        int id_exercicio FK
        int id_rotina FK
        string tipo_serie
        float peso
        int repeticoes
    }

    usuario_exercicio{
        serial id PK
        int id_usuario FK
        int id_exercicio FK
    }
```

