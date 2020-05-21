DROP DATABASE IF EXISTS snaketours;

CREATE DATABASE snaketours;

USE snaketours;

CREATE TABLE Tour (
  tour_id INT NOT NULL AUTO_INCREMENT,
  tour VARCHAR(255),
  overview VARCHAR(255),
  cancellation_policy VARCHAR(255),
  return_details VARCHAR(255)
  PRIMARY KEY(tour_id)
);

CREATE TABLE Attraction (
  attraction_id INT NOT NULL AUTO_INCREMENT,
  attraction VARCHAR(255),
  latitude FLOAT,
  longitude FLOAT,
  description VARCHAR(255),
  rating FLOAT,
  url VARCHAR(255),
  image_path VARCHAR(255),
  image_alt VARCHAR(255),
  PRIMARY KEY(attraction_id)
);

CREATE TABLE TourAttraction (
  tour_id INT REFERENCES Tour(tour_id) ON UPDATE CASCADE ON DELETE CASCADE,
  attraction_id INT REFERENCES Attraction(attraction_id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE INDEX tour_id_index ON TourAttraction(tour_id);
CREATE INDEX attraction_id_index ON TourAttraction(attraction_id);