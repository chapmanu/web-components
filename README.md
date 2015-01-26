# Chapman University Web Components
> Common front-end assets used throughout Chapman products

This project is three things:  
1. A build system for organizing and processing assets  
2. A Bower package repository for distributing the finished assets  
3. A demo website to showcase usage of the assets  

View the demo website here: http://chapmanu.github.io/web-components/.

## Contributing

### Development Dependencies
* Git command-line client  
* Ruby - https://www.ruby-lang.org/en/  
* Ruby Gems - https://rubygems.org/pages/download  

### Initial Setup

Run these commands from your terminal or command prompt:

1. 	`git clone git@github.com:chapmanu/web-components.git`
2. 	`cd web-components`
3. 	`bundle install` Installs ruby gem dependencies
4. 	`rake serve` Starts the local webserver and watches for changes
5. 	View your local version of the site at [http://localhost:4000](http://localhost:4000)

> If you desire a faster feedback loop, you can install the live-reload extention for Chrome or FireFox and connect after running `rake serve`.  This will reload the assets and the browser each time you save a file.

### Frameworks Used

The demo website uses the Jekyll framework.  Documentation can be found here: http://jekyllrb.com/docs/home/.  Along with Jekyll, we use the jekyll-assets plugin to create a Rails-like asset pipeline for a Jekyll website.  Documentation for that can be found here: https://github.com/ixti/jekyll-assets.

### Folder Structure

##### index.html
This is the home page of the website.  You will notice that most of the file contains includes to other files located in the `_includes/` directory.

##### _includes/
Contains html that will be re-used.  It can be referenced anywhere using `{% include file.html %}`.  Included files like this are referenced from the root of the `_includes/` directory.  Therefore, `_includes/molecules/button.html` can be included anywhere with `{% include molecules/button.html %}`.

##### _assets/
Only javascripts and stylesheets located at the root of `_assets/stylesheets` and `_assets/javascripts` will be compiled and made available to bower and the demo site.  However, assets for components should be organized in seperate files and sub-directories, then "included" into a "manifest" file at the root of these folders.

When developing a component, it will usually fall into one of these three categories.  Each category has its own sub-folder where the asset file should be saved.

1. **Shared** - Components which are loaded on to every page, across every website.
2. **Molecules** - Simple elements like buttons, date pickers, or tables.
3. **Organisms** - Specific, complete objects such as a story tile, event preview, or tweet.

### Releasing a New Bower Version

Run `rake release` to publish a new bower version and update the demo site. The release robot will help walk you through these steps.

### Updating the Demo Site

Run `rake publish` to make demo site to match your local version.  Note that this step is already done for you when running `rake release`.

### Linking URLs

In order to link to paths, use the following example:
`<link rel="stylesheet" type="text/css" href ="{{ site.baseurl}}{% asset_path site.css %}">`
