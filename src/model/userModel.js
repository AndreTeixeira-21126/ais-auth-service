'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    first_name: {
        type: String,
        trim: true,
        require: true
    },
    last_name: {
        type: String,
        trim: true,
        require: true
    },
    birth_date: {
        type: Date,
        require: true
    },
    active : {
        type: Boolean,
        default: true
    },
    last_access_date: {
        type: Date,
        default: Date.now
    },
    photo_url: { 
        type: String,
        trim: true,
        default: ""
    },
    username: {
        type: String,
        unique: true,
        trim: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        require: true
    },
    created_date: {
        type: Date,
        default: Date.now
    },
}, {collection: 'users'});


const User = mongoose.model('User', UserSchema);

module.exports = User;