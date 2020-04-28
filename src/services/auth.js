const {
    models,
    jwt,
    google,
    bcrypt,
    moment,
    axios
} = require('./import-module')

const authorize = (permission, modelName) => {
    return async (req,res, next) => {
        if (await isGranted(req.user, permission, modelName, req.params.id || null)) {
            next()
        } else {
            if (!req.user) {
                res.status(401).json({
                    message: 'UNAUTHORIZE!'
                })
            } else {
                res.status(403).json({
                    message: 'FORBIDDEN!'
                })
            }
        }
    }
    // return true
}

const isGranted = (user, permissions, modelName, id) => {
    let status = []
    return Promise.all(
        permissions.map(async (item) => {
            switch(item) {
                case 'everyone': {
                    status.push(everyone())
                }
                break;
                case 'owner': {
                   status.push(await owner(modelName, user, id))
                }
                break;
                case 'authenticated': {
                    status.push(authenticated(user))
                }
                break;
                case 'admin': {
                    status.push(await admin(user, item))
                }
            }
        })
    ).then(hasil => {
        return status.indexOf(true) > -1
    })
    
}

const getRole = async (user) => {
    if (!user) return null
    let roles = await models.Previllage.findOne({
        where: {
            userId: user.userId
        },
        include: {
            model: models.Roles
        }
    })

    return roles
}
const owner = async (modelName, user, id) => {
    if (!user) return false
    let params = {
        where: {
            id: id,
            createdBy: user.userId
        }
    }
    if (modelName == 'Users') {
        params.where = {
            id: user.userId
        }
    }

    let ownedData = await models[modelName].findOne(params)


    if (ownedData && ownedData.id) return true
    else return false
}

const everyone = () => {
    return true
}

const admin = async (user, permission) => {
    let myRole = await getRole(user)
    return myRole && myRole.Role && permission === myRole.Role.name
}

const authenticated = (user) => {
    if (user) return true
    else return false
}




const jwtValidation = (token) => {
    // console.log(token)
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
            if (decoded) resolve (decoded)
            resolve(false)

        });
    })
}

const authenticate = (data) => {
    switch (data.strategy) {
        case 'local': {
            return authLocal(data)
        }
        break;
        case 'google': {
            return oauthProcess(data)
        }
        break;
        default: {
            return Promise.resolve({source: 'auth', status: false})
        }
    }
}

const isPass = (hash, plain) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(plain, hash, (err, result) => {
            if (result) resolve(true)
            else resolve (false)
        })
    })
}

const oauthGoogle = async (param) => {
    const accessToken = param.access_token
    try {
        const { data } = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`);
        return data;
    } catch (error) {
        console.log('error', error.message)

    }
}

const oauthProcess = async (data) => {
    const oauthData = await oauthGoogle(data)
    if (oauthData) return findOrCreateUser(oauthData)
    return {source: 'auth', status: false}
}

const authLocal = async (data) => {
    let user = await models.Users.findOne({
        email: data.email
    })

    if (user && isPass(user.password, data.password)) {
        return {
            token: generateJwtToken()
        }
    }
    else return { source: 'auth', status: false}
}

const hashPassword = (passsword) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(myPlaintextPassword, process.env.SECRET_HASH, function(err, hash) {
           if (hash) resolve(hash)
        });
    })
}

const findOrCreateUser = async (data) => {
    try {
        let user = await models.Users.findOne({
            where: {
                email: data.email
            }
        })
    
        if (user) {
            return {
                token: generateJwtToken(user)
            }
        }
    
        let newUser =  await models.Users.create({
            username: data.email.split('@')[0],
            email: data.email,
            isGoogle: true,
            createdBy: null,
            updatedBy: null
        })

        let userRole = await models.Previllage.create({
            roleId: 2,
            userId: newUser.id,
            createdBy: newUser.id,
            updatedBy: newUser.id
        })
    
        if (userRole) {
            return {
                token: generateJwtToken(newUser)
            }
        } else {
            return {source: 'auth'}
        }
    } catch (error) {
        console.log(error.message)
    }
}

const generateJwtToken = (data) => {
    let payload = {
        userId: data.id,
        email: data.email,
        username: data.username
    }

    let option = {
        algorithm: process.env.JWT_ALGORITHM,
        expiresIn: (60 * 1000 * process.env.JWT_EXP).toString()
    }

    console.log(option)

    return jwt.sign(payload, process.env.JWT_SECRET, option)
}


module.exports = {
    authorize,
    authenticate,
    jwtValidation
}