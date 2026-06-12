const express = require("express");

const router = express.Router();

const { 
    cadastrar, 
    listar, 
    excluir } = require("../controllers/quartos.controllers");

router.post("/cadastrar", cadastrar);
router.get("/listar", listar);
router.delete("/excluir/:id", excluir);

module.exports = router;