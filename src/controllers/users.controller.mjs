const getAllUsers = (req, res) => {
    res.send('Funcsiona user');
}

const createUser = (req, res) => {
    res.send('se crea user');
}
const updateUser = (req, res) => {
    res.send('se actualiza user');
}
const deleteUser = (req, res) => {
    res.send('se elimina user');
}

export { getAllUsers, createUser, updateUser, deleteUser };