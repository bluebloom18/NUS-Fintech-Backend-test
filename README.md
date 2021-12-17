# backend-test
This is a test backend server with APIs running on port 3000 based on a tutorial

The database is linked to a real Posgres database. 

Please ask me for the .env file if you want to run the code

This readme.md follows a template I sourced from 

https://dev.to/rohit19060/how-to-write-stunning-github-readme-md-template-provided-5b09

<h1 align="center"><project-name></h1>

<p align="center"><project-description></p>

## Links

- [Repo] (https://github.com/bluebloom18/NUS-Fintech-Backend-test.git "Repo")

- [Live] (http://bluebloom.star.is/")

- [API] (https://bluebloom18.github.io/NUS-Fintech-Backend-test/ "API")
  
- [Docker Hub] (https://hub.docker.com/repository/docker/bluebloom9876/nus-fintech-backend-test/general) "Docker Hub")

## Github Actions
When code is updated
1. Build Docker .env file from secrets
2. Build and push to Docker Hub when code changes
  
## To replicate and run

Gitclone, and in the project directory, you can run (but you need .env file):
### "npm start" 
  
## DOCKER Workflow

Create docker image: 
### docker build -t image-name .
### docker run -d -p 3000:3000 --env-file .env image-name

## Live Site
- Hosted on Google Cloud Platform
- Files pulled using git clone and then run using Docker

## Built With

- JavaScript
- Node
- NPM
- Docker on VS code

## Screenshot
![](screenshot.png)
  
## Future Updates

- Front End using React
  
## Author

**Lien Ber Luen**

- [Profile](https://github.com/bluebloom18 "Lien Ber Luen")
- [Email](mailto:lienbl@gmail.com?subject=Hi "Hi!")
- [Linkedin](https://www.linkedin.com/in/ber-luen-lien-512ba314/ "Welcome")

## 🤝 Support

Contributions, issues, and feature requests are welcome!

Give a ⭐️ if you like this project!
