# Chapman University Web Components

A build system for common front-end web components used across Chapman University websites.  

## Demo

A demo of the Chapman's web-components and instructions on how to use them can be found at http://chapmanu.github.io/web-components/

## Contributing

*Dependencies*  
Development on this project depends on Ruby and Ruby Gems
* Ruby - https://www.ruby-lang.org/en/  
* Ruby Gems - https://rubygems.org/pages/download

*Initial Setup*

1. 	`git clone git@github.com:chapmanu/web-components.git`
2. 	`cd web-components`
3. 	`bundle install` Installs ruby gem dependencies
4. 	`rake serve` Starts the local webserver and watches for changes
5. 	View your local version of the site at http://localhost:4000

Note: If you desire a faster feedback loop, you can install the live-reload extention for Chrome or FireFox and connect after running `rake serve`.  This will reload the assets and the browser each time you save a file.

*Frameworks Used*

The demo website uses the Jekyll framework.  Documentation can be found here: http://jekyllrb.com/docs/home/.  Along with jekyll, we the jekyll-assets plugin to create a Rails-like asset pipeline for a jekyll website.  Documentation for that can be found here: https://github.com/ixti/jekyll-assets.

*Development Guidelines*

*Folder Structure*

#### _assets
Only javascripts and stylesheets located at the root of `_assets/stylesheets` and  `_assets/javascripts` will be compiled and made available to the demo site.  Keep the assets for components organized in seperate files and sub-directories, then "include" them into a "manifest" file at the root of these folders.

When developing a component, it will usually fall into one of these three categories.  Each category has its own sub-folder where the asset file should be saved.

1. **Shared** - Components which are loaded on to every page, across every website.
2. **Molecules** - Simple elements like buttons, date pickers, or tables.
3. **Organisms** - Specific, complete objects such as a story tile, event preview, or tweet.


#### index.html




`/_layouts/` contains overall layouts that may be applied by the following header:
```
---
layout: default
---
```

#Inclusion Example

`{% include molecules.html %}`
