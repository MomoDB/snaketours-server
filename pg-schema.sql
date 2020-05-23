DROP DATABASE IF EXISTS snaketours;

CREATE DATABASE snaketours;

USE snaketours;

CREATE TABLE Tour (
  tour_id INT NOT NULL AUTO_INCREMENT,
  tour_name VARCHAR(100),
  overview VARCHAR(255),
  cancellation_policy VARCHAR(255),
  return_details VARCHAR(255),
  startpoint_name VARCHAR(100),
  startpoint_street VARCHAR(100),
  startpoint_details VARCHAR(255),
  endpoint_name VARCHAR(100),
  endpoint_street VARCHAR(100),
  endpoint_details VARCHAR(255),
  PRIMARY KEY(tour_id),

);

CREATE TABLE Attraction (
  attraction_id INT NOT NULL AUTO_INCREMENT,
  attraction_name VARCHAR(100),
  latitude FLOAT,
  longitude FLOAT,
  rating FLOAT,
  review_count INT,
  attraction_url VARCHAR(255),
  image_path VARCHAR(255),
  image_alt VARCHAR(255),
  PRIMARY KEY(attraction_id)
);

CREATE TABLE Stops (
  stop_id INT NOT NULL AUTO_INCREMENT,
  tour_id INT REFERENCES Tour(tour_id) ON UPDATE CASCADE ON DELETE CASCADE,
  attraction_id INT REFERENCES Attraction(attraction_id),
  position SMALLINT NOT NULL,
  duration SMALLINT,
  admission_details VARCHAR(15),
  stop_description VARCHAR(255),
  PRIMARY KEY(stop_id)
)

ALTER TABLE Stops ALTER CONSTRAINT tour_id DEFERRABLE INITIALLY DEFERRED;
ALTER TABLE Stops ALTER CONSTRAINT attraction DEFERRABLE INITIALLY DEFERRED;