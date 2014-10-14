# web-components

A build system for common front-end web components used across Chapman University websites.

# How to use

Install web components in your project by including the following files in the head of the page:

```
/dist/cu_components.css - 13kb
/dist/cu_components.js - TBD
```

You can then utilize any of the HTML snippets from the `/src/html/` directory. 


# Development

In order to develop in this repository, you must set up [Gulp.js](http://gulpjs.com/) on your system. Use `gulp watch` to start a server, which pairs with your [live-reload](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en) extension in Chrome. 

# File Structure

Modify files in the `/src/` directory. These are compiled and minified into the `/dist/` directory for usage. Files are generally stored in one of three folders:

1. **Shared** - Components which are loaded on to every page, across every website. 
2. **Molecules** - Simple elements like buttons, date pickers, or tables.
3. **Organisms** - Specific, complete objects such as a story tile, event preview, or tweet. 
