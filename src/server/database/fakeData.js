const cancellationPolicies = [
  'For a full refund, cancel at least 24 hours in advance of the start date of the experience.',
  'Full refunds available for a very reasonable processing fee equal to admission price.',
  'All sales are final and incur 100% cancellation penalties.',
  'We will come for you if you try to cancel on us.',
];

const returnDetails = [
  'Returns to the original departure point',
  'Those who fall behind stay behind',
  'The rendezvous will be disclosed by carrier pigeon',
];

const lead = ['Enjoy A', 'Go On A', 'Take A', 'Beautiful', 'Windy', 'Wonderful', 'Starlight', 'Chaperoned', 'Virtual'];
const conveyance = ['Walking', 'Beautiful', 'Bus', 'Bike', 'Hiking', 'Go-Kart', 'Wine Tour', 'Daydrinking', 'Strolling'];
const tourTitleChunk = ['Tour Of', 'Through', 'Across', 'Around'];
const localeName = ['San Francisco', 'SF', 'The Big Fran', 'The 7 x 7', 'Bay City'];

const coords = {
  north: 37.788915,
  east: -122.390197,
  south: 37.722464,
  west: -122.503719,
};

// Originally acquired file paths to images on disk
// Now we're using S3.
const images = [
  'https://trip-advisor-photo-gallery.s3-us-west-1.amazonaws.com/Itinerary/1024px-Hibernia_Bank%2C_San_Francisco.jpg',
  'https://trip-advisor-photo-gallery.s3-us-west-1.amazonaws.com/Itinerary/13159501074_c13ff7cc0d_b.jpg',
  'https://trip-advisor-photo-gallery.s3-us-west-1.amazonaws.com/Itinerary/2018-09-Salesforce-eschipul-0884-afb96.jpg',
  'https://trip-advisor-photo-gallery.s3-us-west-1.amazonaws.com/Itinerary/2018-09-Salesforce-eschipul-0915-e9941.jpg',
  'https://trip-advisor-photo-gallery.s3-us-west-1.amazonaws.com/Itinerary/32711819568_4755604d06_b.jpg',
  'https://trip-advisor-photo-gallery.s3-us-west-1.amazonaws.com/Itinerary/4083220012_0bbdfbd151_b.jpg',
  'https://trip-advisor-photo-gallery.s3-us-west-1.amazonaws.com/Itinerary/40956932812_bf1735edf3_b.jpg',
  'https://trip-advisor-photo-gallery.s3-us-west-1.amazonaws.com/Itinerary/4844340604_a287f7fed7_b.jpg',
  'https://trip-advisor-photo-gallery.s3-us-west-1.amazonaws.com/Itinerary/640px-Chinatown_San_Francisco_(26720090647).jpg',
  'https://trip-advisor-photo-gallery.s3-us-west-1.amazonaws.com/Itinerary/640px-San_Francisco_Womens_Building.jpg',
  'https://trip-advisor-photo-gallery.s3-us-west-1.amazonaws.com/Itinerary/BalcluthaRainbow-copy.jpg',
  'https://trip-advisor-photo-gallery.s3-us-west-1.amazonaws.com/Itinerary/CCSF_Ocean_Avenue_Campus.jpg',
  'https://trip-advisor-photo-gallery.s3-us-west-1.amazonaws.com/Itinerary/Eureka_688px.jpg',
  'https://trip-advisor-photo-gallery.s3-us-west-1.amazonaws.com/Itinerary/bal_bow_ggb_415px.jpg',
  'https://trip-advisor-photo-gallery.s3-us-west-1.amazonaws.com/Itinerary/images+(1).jpeg',
  'https://trip-advisor-photo-gallery.s3-us-west-1.amazonaws.com/Itinerary/images+(2).jpeg',
  'https://trip-advisor-photo-gallery.s3-us-west-1.amazonaws.com/Itinerary/images.jpeg',
  'https://trip-advisor-photo-gallery.s3-us-west-1.amazonaws.com/Itinerary/pd51b5-021-jj-a.webp',
  'https://trip-advisor-photo-gallery.s3-us-west-1.amazonaws.com/Itinerary/red-and-white-fleet-san-francisco-93197a-1024.jpg',
  'https://trip-advisor-photo-gallery.s3-us-west-1.amazonaws.com/Itinerary/san-francisco-2107524_960_720.webp',
  'https://trip-advisor-photo-gallery.s3-us-west-1.amazonaws.com/Itinerary/san-francisco-3608352_960_720.jpg',
  'https://trip-advisor-photo-gallery.s3-us-west-1.amazonaws.com/Itinerary/san-francisco-golden-gate-bridge-united-states-travel.jpg',
  'https://trip-advisor-photo-gallery.s3-us-west-1.amazonaws.com/Itinerary/san-francisco-public-transportation10.jpg',
  'https://trip-advisor-photo-gallery.s3-us-west-1.amazonaws.com/Itinerary/transamerica-pyramid-san-francisco-902f5a-1024.jpg',
  'https://trip-advisor-photo-gallery.s3-us-west-1.amazonaws.com/Itinerary/union-square-san-francisco-482942-1024.jpg',
];

module.exports = {
  cancellationPolicies,
  returnDetails,
  lead,
  conveyance,
  tourTitleChunk,
  localeName,
  coords,
  images,
};
