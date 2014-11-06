# web-components

View the demos at http://chapmanu.github.io/web-components/demos/.

A build system for common front-end web components used across Chapman University websites.

# How to use

Install web components in your project by including the following files in the head of the page:

```
/dist/cu_components.css - 13kb
/dist/cu_components.js - TBD
```

You can then utilize any of the HTML snippets from the `/src/html/` directory. 


# Development

Installation and setup:

1. `git clone git@github.com:chapmanu/web-components.git`
2. `cd web-components`
3.  `npm install`
4.  `gem install compass`
5.  `gulp watch`

Running `gulp watch` will listen for changes in your project directory and reload the browser when appropriate using the livereload [live-reload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en) extension in Chrome or FireFox.

# File Structure

Modify files in the `/src/` directory. These are compiled and minified into the `/dist/` directory for usage. Files are generally stored in one of three folders:

1. **Shared** - Components which are loaded on to every page, across every website. 
2. **Molecules** - Simple elements like buttons, date pickers, or tables.
3. **Organisms** - Specific, complete objects such as a story tile, event preview, or tweet.
