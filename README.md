# stud-front
The first service at NTU for students and lecturers. The service helps to find quickly and view the current schedule

## Features:
- Support Web Welegram App 
- List of all pairs
- Display of exams (In planning)
- Support PWA (In planning)

### How Stud platform Works:
1. The Student/Lecturer choose the type of schedule what he/she need
2. Student have to choose faculty, course and his/her group 
3. Lecturer have to write his/her surname and select
4. Next, he/she has the opportunity to review the current schedule

## Installation:
1. Clone this repository `git clone https://github.com/ntustud/stud-front.git`
2. Create .env file `cp  .env.example .env`
3. Run Platform:
    - With Docker: `make build`
    - Local with npm: 
      - `npm install`
      - `npm run serve`

## Images:
![Example Bot Image](https://raw.githubusercontent.com/ntustud/stud-front/main/images/app-preview.png)

## Contributions:
Any contributions are welcome, also if there are problems in the process, then create an issue