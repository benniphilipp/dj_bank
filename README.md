# dj_bank

```bash
├── backend/
│   ├── static/
│   │   ├── dist/
│   │   └── public/
│   ├── templates/
│   ├── users/
│   ├── manage.py
│   ├── requirements.txt
│   └── ...
├── frontend/
│   ├── src/
│   │   └── index.js
│   ├── .babelrc
│   └── webpack.config.js
```


#### 1. Virtuelle Umgebung
```
python3.12 -m venv env
```
```
source env/bin/activate
```


#### 2. Requirements installieren
```
pip install -r requirements.txt
```

- (Wenn du noch keine requirements.txt hast, installiere erst die Pakete und mach dann pip freeze > requirements.txt.)


##### 3. Django-Projekt erstellen
```
django-admin startproject <project_name> .
```


#### 4. App erstellen
```
python manage.py startapp users
```


#### 5. Einstellungen (settings.py)
```
# Application definition
INSTALLED_APPS = [
    'django.contrib.sites',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'rest_framework',               # Neu
    'rest_framework.authtoken',     # Neu
    'dj_rest_auth.registration',    # Neu
    'dj_rest_auth',

    'allauth',                      # Neu
    'allauth.account',              # Neu 
    'allauth.socialaccount',        # Neu

    'webpack_loader',               # Neu

    # eigene Apps
    'users',
]
```


#### Webpack Loader
```
WEBPACK_LOADER = {
    'DEFAULT': {
        'CACHE': not DEBUG,
        'BUNDLE_DIR_NAME': '',
        'STATS_FILE': BASE_DIR / 'webpack-stats.json',
        'POLL_INTERVAL': 0.1,
        'TIMEOUT': None,
        'IGNORE': [r'.+\.hot-update.js', r'.+\.map']
    }
}
```


#### Static Files
```
STATIC_URL = 'static/'
STATICFILES_DIRS = [
    BASE_DIR / 'static',
    BASE_DIR / 'static' / 'dist',
    BASE_DIR / 'static' / 'public',
]
```


#### Middleware (Beispiel)
``` 
MIDDLEWARE = [
    'allauth.account.middleware.AccountMiddleware', # neu
]
```


#### Templates (Auszug)
```
import os
```
```
'DIRS': [os.path.join(BASE_DIR, 'templates')],
```


#### 7. Beispiel-Template (templates/base.html)
``` 
<!-- templates/base.html -->
{% load render_bundle from webpack_loader %}
<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <title></title>
  </head>
  <body>
    <div id="root"></div>
    {% render_bundle 'main' %}
  </body>
</html>
```


#### 8. Beispiel-URL (z.B. urls.py)
```
from django.views.generic import TemplateView
from django.urls import path, re_path
```
```
re_path(r"^(?!api/).*", TemplateView.as_view(template_name="base.html")),
```


#### 9. Webpack Config (frontend/webpack.config.js)
```
const path = require('path');
const BundleTracker = require('webpack-bundle-tracker');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../backend/static/dist'),
    filename: '[name].js',
    publicPath: '/static/dist/'
  },
  plugins: [
    new BundleTracker({ filename: '../backend/webpack-stats.json' })
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
```

#### package.json
```
{
    "name": "frontend",
    "version": "1.0.0",
    "scripts": {
        "dev": "webpack --mode development --watch",
        "build": "webpack --mode production"
    },
    "dependencies": {
        "axios": "^1.9.0",
        "bootstrap": "^5.3.0",
        "react": "^18.0.0",
        "react-dom": "^18.0.0",
        "react-router-dom": "^7.6.1"
    },
    "devDependencies": {
        "@babel/core": "^7.0.0",
        "@babel/preset-env": "^7.0.0",
        "@babel/preset-react": "^7.27.1",
        "babel-loader": "^8.0.0",
        "css-loader": "^7.1.2",
        "style-loader": "^4.0.0",
        "webpack": "^5.0.0",
        "webpack-bundle-tracker": "^1.0.0",
        "webpack-cli": "^4.0.0",
        "webpack-dev-server": "^4.15.0"
    }
}
```

#### 10. Babel Config (.babelrc)
```
{
    "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```


#### 11. Node-Pakete installieren
```
npm install \
  react react-dom react-router-dom bootstrap axios \
  @babel/core @babel/preset-env @babel/preset-react babel-loader css-loader style-loader \
  webpack webpack-bundle-tracker webpack-cli webpack-dev-server \
  --save
```


#### 12. Django Migrations
```
python3 manage.py makemigrations
```

```
python3 manage.py migrate
```

```
python3 manage.py createsuperuser
```

```
python3 manage.py runserver
```


#### 13. React-Build
```
# Entwicklung (watch)
npm run dev
```

```
# Produktion
npm run build
```


#### Apps
- https://docs.allauth.org/en/latest/


#### Git Clone
```
git clone git@github.com:benniphilipp/dj_bank.git <neuer_name>
```


#### Verbindung zum alten Remote entfernen 
```
git remote remove origin
```

``` 
rm -rf .git
```

#### Neues Remote hinzufügen
```
git remote add origin https://github.com/Ben/new-repo.git
```


#### Änderungen committen und pushen
```
git add .
```
```
git commit -m "Initial commit"
```
```
git push -u origin main
```