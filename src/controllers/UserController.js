const UserService = require('../services/UserService')

const createUser = async (req, res) => {
  try {
    const {name, email, password, confirmpassword, phone} = req.body
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isCheckEmail = reg.test(email)
    if(!name || !email || !password || !confirmpassword || !phone) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The input is required'
      })
    }else if (!isCheckEmail){
      return res.status(200).json({
      status: 'ERR',
        message: 'The input is email'
      })
    }else if(password !== confirmpassword){
      return res.status(200).json({
        status: 'ERR',
          message: 'The password is equal'
        })
    }
    console.log('isCheckEmail', isCheckEmail)
    const response = await UserService.createUser(req.body)
    return res.status(200).json(response)
  } catch (e) {
    return res.status(404).json({ 
      message: e
    })
  }
}

const loginUser = async (req, res) => {
  try {
    const {name, email, password, confirmpassword, phone} = req.body
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const isCheckEmail = reg.test(email)
    if(!name || !email || !password || !confirmpassword || !phone) {
      return res.status(200).json({
        status: 'ERR',
        message: 'The input is required'
      })
    }else if (!isCheckEmail){
      return res.status(200).json({
      status: 'ERR',
        message: 'The input is email'
      })
    }else if(password !== confirmpassword){
      return res.status(200).json({
        status: 'ERR',
          message: 'The password is equal'
        })
    }
    console.log('isCheckEmail', isCheckEmail)
    const response = await UserService.loginUser(req.body)
    return res.status(200).json(response)
  } catch (e) {
    return res.status(404).json({ 
      message: e
    })
  }
}

module.exports = {
  createUser,
  loginUser
}
