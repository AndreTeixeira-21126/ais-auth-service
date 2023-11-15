const bcrypt = require('bcrypt');
const User = require('../model/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.updateUser = async (req, res) => {
    if(!req.header('Authorization')) {
        return res.status(401).json({message: "Unauthorized"});
    }
    const token = req.header('Authorization').split(' ')[1];
    if(!token) {
        return res.status(401).json({message: "Unauthorized"});
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded) {
        return res.status(401).json({message: "Unauthorized"});
    }

    if(req.body.password) {
        const hash = await bcrypt.hash(req.body.password, 10);
        req.body.password = hash;	
    }
    try {
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const birth_date = req.body.birth_date;
        const username = req.body.username;
        const user = await User.findById(decoded.id);
        if(!user) {
            return res.status(404).json({message: "User not found"});
        }
        user.first_name = first_name? first_name : user.first_name;
        user.last_name = last_name? last_name : user.last_name;
        user.birth_date = birth_date? new Date(birth_date) : user.birth_date;
        user.username = username? username : user.username;

        await user.save();
        res.status(200).json({message: "User updated successfully"});
    } catch (err) {
        return res.status(500).json({message: err.message});
    }

}

exports.deleteUser = async (req, res) => {
    if(!req.header('Authorization')) {
        return res.status(401).json({message: "Unauthorized"});
    }
    const token = req.header('Authorization').split(' ')[1];
    if(!token) {
        return res.status(401).json({message: "Unauthorized"});
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded) {
        return res.status(401).json({message: "Unauthorized"});
    }

   
    try {
        const user = await User.findByIdAndDelete(decoded.id);
        if(!user) {
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json({message: "User deleted successfully"});
    } catch (err) {
        return res.status(500).json({message: err.message});
    }
}

exports.getUserProfile = async (req, res) => {
    if(!req.header('Authorization')) {
        return res.status(401).json({message: "Unauthorized"});
    }
    const token = req.header('Authorization').split(' ')[1];
    if(!token) {
        console.log("Aqui")
        return res.status(401).json({message: "Unauthorized"});
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded) {
        console.log("Aqui")
        return res.status(401).json({message: "Unauthorized"});
    }

    try {
        const user = await User.findById(decoded.id).select('-password').lean()
        if(!user) {
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json(user);
    } catch (err) {
        console.log(err)
        return res.status(500).json({message: err.message});
    }
}



exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({message: "Please fill all required fields"});
        }
        const user = await User.findOne({email})
        if(!user) {
            return res.status(400).json({message: "Email or password is incorrect"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(400).json({message: "Email or password is incorrect"});
        }

        user.last_access_date = Date.now();
        await user.save();
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
        res.status(200).json({token: token});
    } catch (err) {
        return res.status(500).json({message: err.message});
    }

}


exports.register = async (req, res) => {

    try {
    console.log(req.body);
    const { first_name, last_name, birth_date ,username, password, email } = req.body;
    if(!username || !password || !email || !first_name || !last_name || !birth_date) {
        return res.status(400).json({message: "Please fill all required fields"});
    }
    if(password.length < 6) {
        return res.status(400).json({message: "Password must be at least 6 characters"});
    }


    const hash = await bcrypt.hash(password, 10);
    let user = new User({
        username,
        password: hash,
        email,
        first_name,
        last_name,
        birth_date
    });
    console.log(hash)
    user = await user.save()
    res.status(200).json({message: "User created successfully"});
    } catch (err) {
        if(err.code === 11000) {
            res.status(400).json({message: "Username or email already exists"});
        }
        
    }
}