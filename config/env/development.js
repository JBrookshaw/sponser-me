'use strict';

module.exports = {
	db: 'mongodb://quazzy:password@ds031681.mongolab.com:31681/sponserme',
	app: {
		title: 'Champion'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || '641093616025448',
		clientSecret: process.env.FACEBOOK_SECRET || '9ca5ab22e32c1a14eecfe9597c4f178d',
		callbackURL: '/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
		clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
		callbackURL: '/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || 'APP_ID',
		clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
		callbackURL: '/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || 'becb9d8a-0028-441a-936b-a358558363ed',
		clientSecret: process.env.LINKEDIN_SECRET || 'fa7b0e60-bbd6-4ad4-887b-59c36c014374',
		callbackURL: '/auth/linkedin/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || '229f3c1c44589fcd716d',
		clientSecret: process.env.GITHUB_SECRET || '1c66ef984a4350e500a605cdd2c0b50aaff76c0c',
		callbackURL: '/auth/github/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			service: process.env.MAILER_SERVICE_PROVIDER || 'MAILER_SERVICE_PROVIDER',
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
			}
		}
	}
};
