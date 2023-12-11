const router = require("express").Router();
const User = require("../models/User");

// buscar usuários
router.get("/", async (req, res) => {
    const searchTerm = req.query.term;
    // Verifica se há um termo de pesquisa
    if (!searchTerm) {
        return res.status(400).json({ message: "Termo de pesquisa ausente" });
    }
    try {
        const users = await User.find({ username: { $regex: searchTerm, $options: 'i' } });
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
