# web-components

View at http://chapmanu.github.io/web-components/

A build system for common front-end web components used across Chapman University websites.

# Necessary downloads

Ruby - https://www.ruby-lang.org/en/  
Ruby Gems - https://rubygems.org/pages/download

# Development

Installation and setup:

1. 	`git clone git@github.com:chapmanu/web-components.git`
2. 	`cd web-components`
3. 	`bundle install`
4. 	`bundle serve`

# File Structure

Modify images, javascript, and styles in the `/_assets/` directory. Modify html in the `/_includes/` directory. These are compiled and minified into the `/_site/` directory for usage. Files are generally stored in one of three folders:

1. **Shared** - Components which are loaded on to every page, across every website. 
2. **Molecules** - Simple elements like buttons, date pickers, or tables.
3. **Organisms** - Specific, complete objects such as a story tile, event preview, or tweet.

`/_layouts/` contains overall layouts that may be applied by the following header:
```
---
layout: default
---
```

#Inclusion Example

`{% include molecules.html %}`



