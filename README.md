# chrisStarter
Starter for his websites GULP, Browser Sync, Autoprefixer, Plumber, Rename, Sass, Uglify, Imagemin-pngquant

Is mainly for Windows Users if you want to use it on a mac in gulpfile change line 20 to
```

return cp.spawn('jekyll', ['build'], {stdio: 'inherit'}) .on('close', done);

```

###To use this starter project, you'll need the following things installed on your machine.

* [Jekyll](http://google.com) - `$ gem install jekyll`
* [NodeJS](http://google.com) - `use the installer.`
* [GulpJS](http://google.com)- `$ npm install -g gulp`

###Local Installation

Clone this repo, or download it into a directory of your choice.
Inside the directory, run npm install.

###Usage

####development mode
This will give you file watching, browser synchronisation, auto-rebuild, CSS injecting Minify Images, Js and Css.
```

$ gulp

```

Thanks to 
* [shakyShane](https://github.com/shakyShane/jekyll-gulp-sass-browser-sync) for jekyll-gulp-sass-browser-sync
* [Dope](https://github.com/dope/gulp-starter) for gulp-starter
* [DevTips](https://github.com/DevTips/DevTips-Starter-Kit) @travisNeilson for the Starter-Kit
