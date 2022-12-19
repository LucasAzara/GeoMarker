# GeoMarker
![My Image](/src/assets/GeoMarker.png)

A little project that I've been working on utilizing:
* ReactJS 
* TypeScript
* CSS Styled Components
* React Simple Maps
* React Hook Forms
* Zod ( for form verification )  
* Google Firebase as a Database.

Pretty Simple to use, just type in the company ( or anything really ) then the coordinates in Latitude and Longitude ( which you can get pretty easily from Google Maps )
Then you will be redirected to the next page showing off all the locations that were voted on and how many points they accumalted.

If you want to try it for yourself, you'll have to create a Firebase Project here: https://firebase.google.com.

After that's done you'll be given the configurations to interact with your project, which you'll need to add to the firebaseData-Example.ts file. 

After that alter the file name to firebaseData.ts and change the table variable to anything you want really, this variable will be where all of your data will be stored in firebase.

And done! You should be able to interact with the website no problem. Have fun!
