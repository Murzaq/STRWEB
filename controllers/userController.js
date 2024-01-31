const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')


const generateJwt = (id, email) => {
    try {
        const token = jwt.sign({ id, email }, "owo", { expiresIn: '24h' });
        return token;
      } catch (error) {
        return null;
      }
}

class UserController {
    async registration(req, res, next) {
        try{
            const { email, password } = req.body;
            if (!email || !password) {
                return ('Wrong email or password')
            }
            const candidate = await User.findOne({where: {email}})
            if (candidate) {
                return ('This email is already used')
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const user = await User.create({email, password: hashPassword})
            const token = generateJwt(user.id, user.email)
            return res.json({token})    
        } catch (error) {
            console.error('Reg error', error.message);
            return next(error);
          }
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return ('No mathes usernames')
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return ('Wrong password')
        }
        const token = generateJwt(user.id, user.email)
        return res.json({token})
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.email)
        return res.json({token})
    }
}

module.exports = new UserController()