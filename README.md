## I have created a React App and the code lies inside the src folder
## I was not able to import mock.js file because it was throwing an error with RX.Obseravable.interval(1000)
  
  I have only used one external library "@iconify/icons-dashicons/star-filled" for the favorites which can be imported like below
   // npm install --save-dev @iconify/react @iconify/icons-dashicons
    import { Icon, InlineIcon } from '@iconify/react';
    
    Usage:
    1. For Sort, click on each header column and it will sort
    2 For Filter- Hit Show/Hide filter, and it will prompt an input box and start typing the word
    3. For adding to favorites, click on the star icon next to the row and it will pin it to the top and also save it in localStorage
    
    Stack:
    1. I have only used React and JSX , havent used Redux 
    2.I can refactor the code to use redux stores and dispactchers 
    3. Also I have used minimal CSS because I wanted to focus more on the Actual functionality
