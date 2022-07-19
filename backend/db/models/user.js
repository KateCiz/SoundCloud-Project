'use strict';
const bcrypt = require("bcryptjs");

const {
  Model, Validator, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    //this is to be used for the JWTs 
    toSafeObject() {
      const { id, username, email } = this; // context will be the User instance
      return { id, username, email };
    }

    //this checks if the password hashed matches the hashed password stored in the db
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }

    //gets the currentUser info
    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }

    //this logs a user into the application 
    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }

    //this creates a new instance of a user to be stored in the db
    static async signup({ username, email, password }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        email,
        hashedPassword
      });
      return await User.scope('currentUser').findByPk(user.id);
    }

    static associate(models) {
      User.hasMany(models.Album, {foreignKey: 'userId', onDelete: 'cascade', hooks: true })
      User.hasMany(models.Comment, {foreignKey: 'userId', onDelete: 'cascade', hooks: true})
      User.hasMany(models.Playlist, {foreignKey: 'userId', onDelete: 'cascade', hooks: true})
      User.hasMany(models.Song, {foreignKey: 'userId', onDelete: 'cascade', hooks: true })
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 30],
        isNotEmail(value){
          if(Validator.isEmail(value)){
            throw new Error("Cannot be an email.");
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
       validate: {
        len: [3, 256],
        isEmail: true
    }
  },
    hashedPassword:{
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60,60]
      }
  },
  previewImage: {
    type:DataTypes.STRING
  },
   isArtist: {
    type: DataTypes.BOOLEAN
   }
}, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
      }
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ["hashedPassword"] }
      },
      loginUser: {
        attributes: {}
      }
    }
  });
  return User;
};