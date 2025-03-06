# Assets - color variables & global styles

This folder contains global styles and color variables for the project.

**Global styles should _only_ be added to 'App.scss'.**

By default, components should inherit global styles from 'App.scss'.
To access color variables within component css modules, insert the following atop the components .scss file:
@import '../../../assets/color-variables/colors.scss';

***Important!***
The above is assuming the location of the component folder adheres to the current folder structure of project.
