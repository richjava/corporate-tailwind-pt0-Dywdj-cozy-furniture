## Installation and running the site locally
1. Create a fresh Next.JS project
```
npx create-next-app@latest
```
2. Create a fresh Strapi project
```
npx create-strapi-app@4.2.3 my-backend --quickstart --no-run
```
3. Install Built.JS into the backend and frontend projects

If you don't already have the Built.JS CLI installed, run:
```
npm install @builtjs/cli -g
```
Run:
```
built install
```
4. Set up (and run) the backend project locally
```
cd my-backend
```
Run backend project (use "start" not "develop" for this first time so that the setup will run without properly):
```
npm run start
```
5. Run frontend project locally (assuming Next.JS project name is "my-frontend")
```
cd my-frontend
```
Install newly added dependencies (if any):
```
npm install
```
Run project:
```
npm run dev
```
## Deployment
### Deploying the backend project to Heroku
The following outlines how to deploy using Heroku CLI. For other deployment options, see [the Strapi Hosting Provider Guide](https://docs.strapi.io/developer-docs/latest/setup-deployment-guides/deployment.html#hosting-provider-guides).

#### Prerequisites
- A [Heroku](https://heroku.com) account and Heroku CLI installed on your computer
- A [Cloudinary](https://cloudinary.com) account

#### Steps
1. Add the following to the project's ```.gitignore``` file:
```
package-lock.json
```
Even though it is usually recommended to version this file, it may create issues on Heroku.

2. In your backend project's .env file, add your Cloudinary credentials:
```
CLOUDINARY_NAME=<your-cloudinary-name>
CLOUDINARY_KEY=<your-cloudinary-key>
CLOUDINARY_SECRET=<your-cloudinary-secret>
```

3. Open the terminal on your project, and log in to Heroku:
```
heroku login
```

4. Then, run the following (replacing "<builtjs-my-backend>" with the name for your Heroku app):
```
git init
heroku create <builtjs-my-backend>
heroku addons:create heroku-postgresql:hobby-dev --app <builtjs-my-backend>
heroku config:set NODE_ENV=production
heroku config:set MY_HEROKU_URL=$(heroku info -s | grep web_url | cut -d= -f2)
heroku config:set APP_KEYS=$(cat .env | grep APP_KEYS | cut -d= -f2-)
heroku config:set API_TOKEN_SALT=$(cat .env | grep API_TOKEN_SALT | cut -d= -f2)
heroku config:set ADMIN_JWT_SECRET=$(cat .env | grep ADMIN_JWT_SECRET | cut -d= -f2)
heroku config:set JWT_SECRET=$(cat .env | grep -w JWT_SECRET | cut -d= -f2)
heroku config:set APP_KEYS=$(openssl rand -base64 32)
heroku config:set API_TOKEN_SALT=$(openssl rand -base64 32)
heroku config:set ADMIN_JWT_SECRET=$(openssl rand -base64 32)
heroku config:set JWT_SECRET=$(openssl rand -base64 32)
yarn add @strapi/provider-upload-cloudinary pg pg-connection-string
```

If you are using Cloudinary or another image provider, you'll need to:
1. Set the Heroku environment variables for it:
```
heroku config:set CLOUDINARY_NAME=<your_cloudinary_name>
heroku config:set CLOUDINARY_KEY=<your_cloudinary_key>
heroku config:set CLOUDINARY_SECRET=<your_cloudinary_secret>
```
2. Update the ```config/middlewares.json``` file to replace ```'strapi::security'``` with this:
```
{
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        directives: {
          'img-src': ["'self'", 'data:', 'strapi.io', 'res.cloudinary.com/'],
        },
      }
    },
}
```

Then run:
```
git add -A
git commit -m "First commit"
git push heroku HEAD:main
```

5. Finally, open the app in the browser:
```
heroku open
```
You will see the Strapi backend application running in the browser. To navigate to the Admin Panel, append "/admin" to the URL.

### Deploying the frontend project to Vercel
#### Prerequisites
- The backend app running on Heroku that was created in the steps above
- A [Vercel](https://vercel.com) account

#### Steps
1. Go to [https://vercel.com/new](https://vercel.com/new).
2. Click on the "Import" for your repository.
3. Under "Configure Project", click "Environment Variables".
4. Add the following environment variables:

| Key            | Description                         | Value                                          |
|----------------|-------------------------------------|------------------------------------------------|
| BACKEND_DOMAIN | Domain name of backend              | herokuapp.com                                  |
| API_URL        | URL of backend with "/api" appended | e.g. https://heroku-app-name.herokuapp.com/api |
| NODE_ENV       | Production Node environment         | production                                     |

5. Click the "Deploy" button.

That's it! Your site is deployed and you can easily make changes to it through Git. 

The frontend project includes [Next.JS Incremental Static Regeneration](https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration), so changes to the content in the CMS will automatically be picked up by the frontend.