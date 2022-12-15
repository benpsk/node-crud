import User from "../model/User.js";

export const handleLogout = async (req, res) => {

    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(204); // no content

    const refreshToken = cookies.jwt;

    // is refreshToken in db?
    const foundUser = await User.findOne({ refreshToken }).exec();

    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        return res.sendStatus(204);
    }

    // delete refreshToken in db
    foundUser.refreshToken = '';
    const result = await foundUser.save();

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
}