DROP DATABASE IF EXISTS snaketours;

CREATE DATABASE snaketours;

USE snaketours;

-- CREATE TABLE Business (
--   business_id INT NOT NULL AUTO_INCREMENT,
--   business_name VARCHAR(50),
--   PRIMARY KEY(business_id)
-- )

CREATE TABLE Tour (
  tour_id INT NOT NULL AUTO_INCREMENT,
  tour_name VARCHAR(100),
  overview TEXT,
  cancellation_policy TEXT,
  return_details TEXT,
  PRIMARY KEY(tour_id),
  -- business_id REFERENCES Business(business_id) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Attraction (
  attraction_id INT NOT NULL AUTO_INCREMENT,
  attraction_name VARCHAR(100),
  latitude FLOAT,
  longitude FLOAT,
  description TEXT,
  rating FLOAT,
  url VARCHAR(255),
  image_path VARCHAR(255),
  image_alt VARCHAR(255),
  PRIMARY KEY(attraction_id)
);

CREATE TABLE TourAttraction (
  tour_id INT REFERENCES Tour(tour_id) ON UPDATE CASCADE ON DELETE CASCADE,
  attraction_id INT REFERENCES Attraction(attraction_id) ON UPDATE CASCADE ON
  DELETE CASCADE,
  PRIMARY KEY(tour_id, attraction_id)
);

CREATE INDEX tour_id_index ON TourAttraction(tour_id);
CREATE INDEX attraction_id_index ON TourAttraction(attraction_id);