## Daily Dose

- [Daily Dose](#daily-dose)
- [General Info](#general-info)
- [Technologies](#technologies)
- [Content](#content)
- [Resources](#resources)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

## General Info
Daily Dose is an web-based productivity application that provides the users with personalized tasks for the sake of self-improvement. This application is created as a part of BCIT 1800 project. 
	
## Technologies
Technologies used for this project:
* HTML, CSS
* JavaScript
* Bootstrap
* Firebase and Firestore 
	
## Content
Content of the project folder:

```
 Top level of project folder: 
├── .gitignore          # Git ignore file
├── details.html        # HTML file, the details page for each task. 
├── index.html          # landing HTML file, this is what users see when you come to url
├── login.html          # login HTML file, the log-in page
├── main.html           # main HTML file, the landing page after log-in or user set-up
├── notification.html   # HTML file, the page where the user can modify their notifications 
├── package-lock.json   # Json file, for specifying all the versions of the dependencies.
├──  package.json       # Json file, for all the dependencies used for this project.
├── profile.html        # profile HTML file, the profile page where the user can go to through the profile icon
├── progress.html       # main HTML file, the progress page after the profile page
├── settings.html       # settings HTML file, the settings page where the user can go to 
through the settings icon
└── README.md           # the README file


It has the following subfolders and files:
├── .git                # Folder for git repo
├── images              # Folder for images
        /avatar.jpg
        /background.jpg
        /DAILY_DOSE.png
        /smoothie.jpg
        /tip1jpg
        /tip2.jpg
        /tip3.jpg
        /tip4.jpg
        /tip5j.jpg
        /tip6.jpg
        /tip7.jpg
        /tip8.jpg
        /tip9.jpg
        /tip10.jpg
        /tip11.jpg
        /tip12.jpg
        /tip13-jpg
        /tip14.jpg
        /tip15.jpg
        /tip16jpg
        /tip17.jpg
        /tip18.jpg
        /tip19.jpg
        /walking.jpg

        
├── scripts                     # Folder for scripts
        /our_scripts            # Folder for page-level scripts
            /details.js         # JS for details.html
            /login.js           # JS for login.html
            /main.js            # JS for main.html
            /notification.js    # JS for notification.html
            /profile.js         # JS for profile.html
            /progress.js        # JS for progress.html

        /universal_functions    # Folder for functionality-level scripts
            /back_page.js       # back button function
            /complete_tip.js    # complete tip functions 
            /filter_tips.js     # filter tips functions
            /remove_item.js     # remove item functions
        /firebase_api.js        # firebase API stuff, shared across pages

├── styles          # Folder for styles
        /details.css		    # style for details.html
        /index.css		        # base style for all the html files
        /main.css		        # style for main.html
        /profile.css		    # style for profile.html
        /progres.css		    # style for progress.html
        /settings.css		    # style for settings.html


Firebase hosting files: 
├── .firebase
	/hosting..cache
├── .firebaserc
├── 404.html
├── firebase.json
├── firestore.indexes.json
├── firestore.rules
├── storage.rules


```


## Resources
- Bootstrap icons (https://icons.getbootstrap.com/)
- Logo homemade

## Contact 
* Yoshiyuki Nagai - ynagai1@my.bcit.ca 
* Sarah Semkowi - ssemkow@my.bcit.ca 
* Ashkan Zahedanaraki - azahedanaraki@my.bcit.ca 

## Acknowledgements 
* <a href="https://getbootstrap.com/">Bootstrap</a>
* <a href="https://firebase.google.com/">FireBase</a>
