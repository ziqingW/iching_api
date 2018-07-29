[![Build Status](https://travis-ci.org/ziqingW/iching_api.png)](https://travis-ci.org/ziqingW/iching_api)

# iching_api
This is the server powered by Node.js and Express for the project "Ask Yingyang".

The UI part of the project was created with React [(Github)](https://github.com/ziqingW/iching_react_ui).

This is the work for the assigned individual project by DigitalCrafts. 

## Features
#### Main Feature
- It is a fortunetelling game utilizing the philosophy of 'Ying & Yang' from the ancient Chinese. 
- You can ask any questions, then as the old way you will toss three coins for six times. Based on the coin-toss results, you will get two different symbols. 
- One Symbol for the current status of the question, and the other one for the future. You will find out the hidden answers by yourself from the hints of the symbols.
#### Other Features
- Support historical results search
- Support two kinds of direct symbol lookup with the related symbol number: Hexagram search and Trigram search

## Nerd's thinking
### Gains:
- I applied Redux and React router on this project. Both worked smoothly and stably
- It's the first time I combined node.js with React in one app, it feels good

### Pains:
- The API returning the critical data required for this project was not supported by React-build, so I had to import it in backend then made requests from express instead of directly using it at React frontend
- I had huge problems when deploying it to Heroku
- After enormous attempts I still couldn't make both express_API and React_UI working together if I include them in one package
- Eventually I overcame it by deploying two separate packages to heroku

## Major Techs:
- React
- Redux
- React Router
- PostgreSQL
- Node.js
- Express

## Published:
[Heroku: Ask Yingyang](https://askyingyang.herokuapp.com/)
 


