import dbConnect from './dbConnect.js';

export async function userLogin(req, res) {
    const db = dbConnect();
    const { email, password } = req.body;

    const matchingUsers = await db.collection('users')
        .where('email', "==", email.toLowerCase())
        .where('email', "==", password)
        .get();

    const users = matchingUsers.docs.map(doc => ({ ...doc.data(), uid: doc.id }));
    if (!users.length) {
        res.status(401).send({ message: 'Invalid email or password' })
        return;
    };

    let user = users[0];
    user.password = undefined;

    res.send(user);
}

export async function addNewUser(req, res) {
    const { email, password } = req.body;
    const db = dbConnect();

    const doc = await db.collection('users')
        .add({ email, password })

    /*
        We should write code to make sure email doesn't already exists.
    */

    userLogin(req, res);
}