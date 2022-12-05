let appConstants = require("../config/appConstants")
module.exports = function (Sequelize, sequelize, DataTypes) {
	return sequelize.define("profile", {
		...require("./core")(Sequelize, DataTypes),
		email: {
			type: DataTypes.STRING(200),
			allowNull: true
		},
		emailVerified: {
			type: DataTypes.TINYINT(1),
			defaultValue: 0,
			field: "emailVerified"
		},
		password: {
			type: DataTypes.STRING(100),
			allowNull: true,
			field: "password"
		},
		passwordResetToken: {
			type: DataTypes.STRING(200),
			allowNull: true,
			field: "passwordResetToken"
		},
		forgotPasswordGeneratedAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW(0),
			field: "forgotPasswordGeneratedAt"
		},
		Image: {
			type: DataTypes.STRING(255),
			allowNull: true,
		},
		Name: {
			type: DataTypes.STRING(150),
			defaultValue: null,
		},
		Pronouns: {
			type: DataTypes.ENUM,
			values: appConstants.APP_CONSTANTS.PRONOUNS_NAME
		},
		Bio: {
			type: DataTypes.STRING(300),
			defaultValue: null,
		},
		phoneNumber: {
			type: DataTypes.STRING(16),
			defaultValue: null,
		},
		dateOfBirth: {
			type: DataTypes.DATE,
            field: "dateOfBirth"
		},
		Gender: {
			type: DataTypes.ENUM,
            values: appConstants.APP_CONSTANTS.GENDER
		},
		HonorsAwards: {
			type: DataTypes.STRING(20),
			defaultValue: null
		},
		serviceDisabled: {
			type: DataTypes.TINYINT(1),
			defaultValue: 0,
			field: "serviceDisabled",
		},
		myPersonalities: {
			type: DataTypes.STRING(40),
			defaultValue: null
		},
		currentLocation: {
			type: DataTypes.STRING(30),
			defaultValue: null
		},
		location: {
			type: DataTypes.STRING(30),
			defaultValue: null 
		},
		zipCode: {
			type: DataTypes.INTEGER(10),
			defaultValue: null
		},
		document: {
			type: DataTypes.STRING(255),
			defaultValue: null
		},
		marriageCertificate: {
			type: DataTypes.STRING(255),
			defaultValue: null
		},
		spouseName: {
			type: DataTypes.STRING(20),
			defaultValue: null
		},
		service: {
			type: DataTypes.ENUM,
			values: appConstants.APP_CONSTANTS.SERVICE
		},
		jobTitle: {
			type: DataTypes.ENUM,
			values: appConstants.APP_CONSTANTS.SERVICE
		},
		servicehonorsAwards: {
			type: DataTypes.STRING(40),
			defaultValue: null
		},
		vegetranServiceDisabled: {
			type: DataTypes.TINYINT(1),
			defaultValue: 0,
			field: "vegetranServiceDisabled",
		},
		termCondition: {
			type: DataTypes.TINYINT(1),
			defaultValue: 0,
			field: "termCondition",
		}	

	}, {
		tableName: "profile",
		timestamps: true,
		paranoid: true,
		deletedAt: 'destroyTime'
	});
};