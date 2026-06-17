const prisma = require("../data/prisma");

const listar = async (req, res) => {
    const estadias = await prisma.reserva.findMany({
        include: {
            quarto: true
        }
    });

    return res.status(200).json(estadias);
};

const cadastrar = async (req, res) => {
    const data = req.body;

    const reserva = await prisma.reserva.create({
        data: {
            hospede: data.hospede,
            data_entrada: new Date(data.data_entrada),
            data_saida: new Date(data.data_saida),
            quartoId: Number(data.quartoId)
        },
        include: {
            quarto: true
        }
    });

    return res.status(201).json(reserva);
};

const excluir = async (req, res) => {
    try {
        const { id } = req.params;

        const reserva = await prisma.reserva.delete({
            where: { id: Number(id) }
        });

        return res.status(200).json(reserva);
    } catch (error) {
        console.error("Erro ao excluir reserva:", error);
        return res.status(500).json({ error: "Erro ao excluir reserva." });
    }
};

module.exports = {
    cadastrar,
    listar,
    excluir
};