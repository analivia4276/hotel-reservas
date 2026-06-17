# Sistema de Hotel - Reservas

## Descrição
Sistema web full-stack para gerenciamento de quartos e reservas de um hotel, com cadastro, listagem e exclusão de dados, integrando front-end, back-end e banco de dados.

## Tecnologias

### Back-end
- Node.js
- Express
- Prisma ORM
- MySQL

### Front-end
- HTML
- CSS
- JavaScript

## Banco de Dados
Banco: hotel_db

### Quarto
- id (INT, PK, AUTO_INCREMENT)
- numero (VARCHAR)
- tipo (VARCHAR)

### Reserva
- id (INT, PK, AUTO_INCREMENT)
- hospede (VARCHAR)
- data_entrada (DATE)
- data_saida (DATE)
- quartoId (INT, FK)


## Relacionamento
- Um quarto pode ter várias reservas
- Uma reserva pertence a um quarto


## API

### Quartos
- GET /quartos/listar
- POST /quartos/cadastrar
- DELETE /quartos/excluir/:id

### Reservas
- GET /reservas/listar
- POST /reservas/cadastrar
- DELETE /reservas/excluir/:id


## Execução

### Back-end
cd api  
npm install  
npm run dev  





## Autor
Ana Livia Prado  
SENAI - 2026
