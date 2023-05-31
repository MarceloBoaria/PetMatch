CREATE DATABASE petmatch;

CREATE USER 'petmatch'@'localhost' IDENTIFIED BY 'petmatch';

GRANT ALL PRIVILEGES ON petmatch.* TO 'petmatch'@'localhost';