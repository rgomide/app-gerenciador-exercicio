# app-gerenciador-exercicio

## Sumário

- [Executar o projeto](#executando-o-projeto)
- [Ícones](#ícones)
- [Referências](#referências)

## Executando o projeto

1. Adicione as chaves de conexão com o Supabase no arquivo [supabaseConfig.js](./src/config/supabaseConfig.js).
2. Execute `npm install`.
3. Execute `npm run web`.

## Comandos Uteis do github

### 1. Criar novo branch
```
    git checkout -b nome-branch
```

### 2. Atualizar branch local
```
    git pull
```

### 3. Configurar `user.name`

- Configurar de forma global para a máquina
```
    git config --global user.name "primeiro_nome sobrenome"
```
- Configurar especificamente para um repositório
```
    git config user.name "primeiro_nome sobrenome"
```

### 4. Configurar `user.email`
- Configurar de forma global para a máquina
```
    git config --global user.email "nome@example.com"
```
- Configurar especificamente para um repositório
```
    git config user.email "nome@example.com"
```

### 5. Função do `git push`
Serve para enviar os commits locais para um repositório remoto

### 6. Função do `git pull`
Usado para buscar e baixar conteúdo de repositórios remotos e fazer a atualização imediata ao repositório local para que os conteúdos sejam iguais

### 7. Fazer o checkout de uma branch existente
```
git checkout NOME-DA-BRANCH
```

### 8. Fazer o checkout para uma nova branch
```
git checkout -b NOME-DA-NOVA-BRANCH
```

### 9. Verificar qual é o branch atual
```
git branch --show-current
``` 



## Ícones

Os ícones utilizados são da biblioteca [@expo/vector-icons](https://docs.expo.dev/guides/icons/#expovector-icons). Eles podem ser consultados a partir da [galeria oficial](https://icons.expo.fyi/Index).

## Referências

- [useState](https://react.dev/reference/react/useState)
- [useEffect](https://react.dev/reference/react/useEffect)
- [useContext](https://react.dev/reference/react/useContext)
- [Biblioteca React Native Elements](https://reactnativeelements.com/)
- [i18next](https://www.i18next.com/)
- [React i18next](https://react.i18next.com/)