# WEB-SimbajuPI

Comandos para rodar o `Docker`

## Para rodar

Basta instalar o **Docker Desktop** e rodar o comando abaixo na raíz do projeto. 
Acesse em `localhost:5173`

```bash
docker-compose up 
```

## Parar o container
```bash
docker-compose stop
```

## Caso precise re-buildar
Caso você instale outras dependências, você pode reconstruir o container para instalar

```bash
docker-compose build --no-cache
```

## Para acessar terminal do container
Pode ser necessário para rodar comando `artisan`

```bash
docker compose exec app bash
```
