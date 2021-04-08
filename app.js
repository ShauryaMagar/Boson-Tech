const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const http = require("https");
const mongoose = require("mongoose");


const app = express();

app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/cityDB",{useNewUrlParser:true, useUnifiedTopology:true});

const citySchema = new mongoose.Schema({
  name: String,
  country: String,
  temperatures: String,
  transport: String,
  food: [{
    foodName: String,
    foodDesc: String,
    foodImage: String

  }],
  sites: [{
    siteName: String,
    siteFact: String,
    siteImage: String
  }]
})

const City = mongoose.model("City",citySchema);

// const newCity = new City ({
//   name: "Mumbai",
//   country : "India",
//   temperatures: "Hot and Humid throughout the year. Heavy rains during monsoon",
//   transport:"Bus, Taxis, Rickshaws, Mumbai Suburban Railway, Metro.",
//   food:[{
//     foodName:"Batata Vada",
//     foodDesc:"If you are not a Mumbaikar, this is something which should not be skipped. Whether it”s for breakfast, lunch or teatime, Batata Vada can go with anything. ",
//     foodImage:"https://www.cleartrip.com/collections/wp-content/uploads/2019/03/batatavada-559x330.jpg"
//   },{
//     foodName:"Bhel Puri",
//     foodDesc:"Yes, it is Mumbai’s “Chaat”. It is a kind of snack that every ‘bhel walla’ will make in a different way with a matchless blend of flavours.",
//     foodImage:"https://www.cleartrip.com/collections/wp-content/uploads/2019/03/bhelpuri-494x330.jpg"
//   }],
//   sites:[{
//     siteName: "Gateway of India",
//     siteFact: "The Gateway of India is an arch-monument built in the early twentieth century in the city of Mumbai, in the Indian state of Maharashtra. It was erected to commemorate the landing in December 1911 at Apollo Bunder, Mumbai of King-Emperor George V and Queen-Empress Mary, the first British monarch to visit India.",
//     siteImage: "https://im.indiatimes.in/media/content/2016/Sep/3-1-media_web_1473850810.jpg"
//   },{
//     siteName:"Chhatrapati Shivaji Terminus",
//     siteFact:"Planned originally as the office of the Great Indian Peninsula Railways, and now functioning as the Central Railways headquarters, Chhatrapati Shivaji Terminus or CST - formerly Victoria Terminus - is worth having on your bucket list if you are a history buff, since this is a UNESCO World Heritage Site and one of India’s finest and oldest Victorian-Italianate-Gothic style architectural buildings. A truly historic railway station in Mumbai built in the late 1800s, CST was designed by F. W. Stevens, drawing inspiration from Sir Gilbert Scott’s St Pancras International railway terminus in central London.  CST is constructed with marble, ornamental ironwork, multi-coloured stones and tiles. The elegant building’s frontage boasts of projecting wings and a colossal dome that has the structure of a woman called the Statue of Progress - holding a flamed torch in her right hand and a wheel in her left, signifying progress. ",
//     siteImage: "https://im.indiatimes.in/media/content/2016/Sep/1-wikimedia_1473850755.jpg"
//   },{
//     siteName: "Mani Bhavan",
//     siteFact: "Located near Wilson College in downtown Mumbai’s Laburnum Road, Mani Bhavan is a significant historical memorial linked to Mahatma Gandhi. This is where he resided from 1917 to 1934 at the time of the Indian freedom struggle. It is from here that he contrived and directed the Non-Cooperation, Swadeshi, Satyagraha, Khadi and Khilafat movements/agitations.",
//     siteImage: "https://im.indiatimes.in/media/content/2016/Sep/5-1-i_1473850877.jpg"
//   }]
// });

// const newCity = new City ({
//   name: "Delhi",
//   country : "India",
//   temperatures: "Summer (Jun–Aug) is very hot. Monsoon season is Jun–Sep. Winter (Dec–Feb) is cool. Oct–Mar is the peak travel time.",
//   transport:"Buses, Auto-rickshaws, Taxis, Cycle-rickshaws, Metro, Ring Railway",
//   food:[{
//     foodName:"Chaat",
//     foodDesc:"If there is one thing that keeps the Delhi food scene ticking it’s the Street Food. With a variety that is unmatched, eating on the streets of Delhi is a crash course in the history and culture of the place. Chandni Chowk is undoubtedly the Street Food Capital of Delhi, and while no guide book can actually pinpoint the best places for Chaat, there are some landmark food haunts that really stand out.",
//     foodImage:"https://seoimgak.mmtcdn.com/blog/sites/default/files/images/famous-dishes-of-delhi-gol-gappa.jpg"
//   },{
//     foodName:"Paranthas",
//     foodDesc:"From being the perfect start to a “healthy” morning in most Delhi households, to a meal for hungry college students and even a late-night snack, paranthas are definitely on the top of the list when it comes to my favorite food in Delhi. Choose from a plain one or select a stuffing of your choice - potatoes, cauliflower, radish, eggs, keema, bananas or even last night’s left over dal - the options are galore.",
//     foodImage:"https://seoimgak.mmtcdn.com/blog/sites/default/files/images/famous-dishes-of-delhi-parantha.jpg"
//   }],
//   sites:[{
//     siteName: "Qutub Minar",
//     siteFact: "This 73-meter high tower was built by Qutub-ud-Din Aibak in the year 1193. Built after the defeat of Delhi’s last Hindu ruler, the Qutub Minar was constructed to celebrate the Muslim supremacy in Delhi. It is the highest tower in India, with five levels and projecting balconies. The first three levels are made up of red sandstone and the last two of marble and sandstone.",
//     siteImage: "https://static-blog.treebo.com/wp-content/uploads/2018/03/Qutub-Minar-was-built-in-1193-.jpg"
//   },{
//     siteName:"Humayun’s Tomb",
//     siteFact:"A UNESCO World Heritage Site, Humayun’s Tomb is a stunning piece of Persian architecture built in the Mughal era. It was commissioned in 1526, nine years after Humayun’s death, by his widow Hamida Banu Begum. This beautiful monument is made of red sandstone.",
//     siteImage: "https://static-blog.treebo.com/wp-content/uploads/2018/03/Humayun%E2%80%99s-Tomb-is-a-UNESCO-World-Heritage-Site-.jpg"
//   },{
//     siteName: "Red Fort (Lal Qila)",
//     siteFact: "This enormous red sandstone fort is synonymous with Delhi and is a testimony of the glory of the Mughal Empire. Built in 1638 by Shah Jahan, it took around ten years to be completed. A UNESCO World Heritage Site, the Red Fort is octagonal in shape with walls adorned with flowers and calligraphy, typically in the style of beautiful Mughal era architecture.",
//     siteImage: "https://static-blog.treebo.com/wp-content/uploads/2018/03/Lal-Qila-took-a-decade-to-complete-.jpg"
//   }]
// });

// newCity.save(function(err){
//   if(!err){
//     console.log("New city added to database")
//   }else{
//     console.log("err")
//   }
// })
app.post("/",function(req,res){
  let loc=req.body.city;
  loc=loc.toLowerCase();
  console.log(loc);
  City.findOne({name:loc},function(err,city){
    if(!err){
      res.render("city",{
        id:city.__id,
        name:city.name.toUpperCase(),
        country:city.country,
        temperature:city.temperatures,
        transport:city.transport,
        food:city.food,
        sites:city.sites
      })
    }else{
      console.log(err);
      res.redirect("/");  
    }
  })
});

app.get("/", function(req, res) {
  res.render("home");
})

app.post("/search",function(req,res){
    var cityName =req.body.city;
    var options = {
        "method": "GET",
        "hostname": "wft-geo-db.p.rapidapi.com",
        "port": null,
        "path": "/v1/geo/cities?namePrefix="+cityName+"&sort=India",
        "headers": {
            "x-rapidapi-key": "47c6576c39mshd96f5ef52477c9cp1ae6efjsn7c287bdd0905",
            "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
            "useQueryString": true
        }
    };
    
    const require = http.request(options, function (res) {
    
        res.on("data", function (data) {
          const placeData = JSON.parse(data);
          const placeCountry = placeData.data[0].country;
          const placeRegion = placeData.data[0].region;
          const placeLat = placeData.data[0].latitude;
          const placeLong = placeData.data[0].longitude;

          console.log(placeCountry.toString() + " "+placeRegion.toString()+ " "+placeLat.toString()+ " "+placeLong.toString()  );
          console.log(placeData)
        });
    
    });
    
    require.end();



})




app.listen(3000, function() {
  console.log("Server is running on port 3000")
})
