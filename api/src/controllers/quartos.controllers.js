const prisma = require("../data/prisma");

const listar = async (req, res) => {
    const quartos = await prisma.quarto.findMany({
        include: {
            reservas: true
        }
    });

    return res.status(200).json(quartos);
};

const cadastrar = async (req, res) => {
    const data = req.body;

    const quarto = await prisma.quarto.create({
        data: {
            numero: data.numero,
            tipo: data.tipo
        },
        include: {
            reservas: true
        }
    });

    return res.status(201).json(quarto);
};

const excluir = async (req, res) => {
    try {
        const { id } = req.params;

        const quarto = await prisma.quarto.delete({
            where: { id: Number(id) }
        });

        return res.status(200).json(quarto);
    } catch (error) {
        console.error("Erro ao excluir quarto:", error);
        if (error.code === 'P2003') {
            return res.status(400).json({ error: "Erro ao excluir, quarto já reservado!" });
        }
        return res.status(500).json({ error: "Erro ao excluir quarto." });
    }
};

module.exports = {
    cadastrar,
    listar,
    excluir
};