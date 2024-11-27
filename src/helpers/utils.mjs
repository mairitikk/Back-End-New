const createToken = () => {
    const token = crypto.randomBytes(32).toString('hex');
}
export default createToken