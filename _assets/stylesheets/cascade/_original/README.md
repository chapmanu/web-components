This is the directory where each Chapman CSS file has been converted into modular Sass. Every original Chapman CSS file now has its own .scss file, which is a compiled version of all of the modules for the given stylesheet. The name of each file is based on the name of the original CSS file. If you are unsure of the original CSS file that a Sass file is based on, there is a comment at the top of each file showing its source.

Please some Sass files have prefixes if their source CSS is from certain directories:

level_: css/level/css
widgets_: css/widgets/primary-content
theme_: css/custom
virtual-tour_: virtualTour/css

Note: Files prefixed with theme_ are not large enough to require modules. All styles for each theme are in the .scss file in this directory.

Each folder in this level of the directory (helpers, layout, modules, and print) has subfolders that match the name of each of these .scss files. Any files found within these folders are imported into the corresponding .scss file as modules.

For example, we have style.scss. If you open it in a text editor, you will see that it’s importing various files within the following directories:

helpers/style
layout/style
modules/style
print/style

This separation of modules ensures that the styles from each original Chapman CSS file can still be used in the same way they used to be, while still using Sass.

————————————————————

To update the Sass, you must use the command line to watch for changes and compile your Sass. Before you make changes to the Sass, follow these steps:

1. Open a new Terminal window.
2. CD into web-components/src/static.
3. Run “grunt server” in that directory.

The build system, Grunt, will now be watching for Sass changes and recompile your Sass for you.

————————————————————

1/22/15
Sarah Harissis
BarkleyREI