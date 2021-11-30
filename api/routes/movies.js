const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require("../VerifyToken");

//Create
router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new Movie(req.body);
    try {
      const savedMovie = await newMovie.save();
      res.status(201).json(savedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//Update
router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      },
      {
          new:true
      });
  
      res.status(201).json(updatedMovie);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});
//Delete
router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Movie.findByIdAndDelete(req.params.id);
  
      res.status(201).json("The Movie has been deleted");
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("You are not allowed!");
  }
});

//Get

router.get("/find/:id", verify, async (req, res) => {
 
    try {
      const movie=await Movie.findById(req.params.id);
  
      res.status(200).json(movie);
    } catch (err) {
      res.status(500).json(err);
    }

});
//Get Random
router.get("/random", verify, async (req, res) => {
    const type=req.query.type;
    // console.log("backend run");
 let movie;
    try {
        if(type==="series")      //when we have selected series in homepage then it will
                                  //it will fetch this data
        {
            movie=await Movie.aggregate([
                {$match:{isSeries:true}},
                {$sample:{size:10}},

            ])
        }
        else       //when we have selected movies or if we have selected nothing i.e we are
                      // in homepage then it will fetch this data
                       
        {
            movie=await Movie.aggregate([
                {$match:{isSeries:false}},
                {$sample:{size:10}},
            ])
        }
  
      res.status(200).json(movie);
    } catch (err) {
      res.status(500).json(err);
    }

});
//Get All
router.get("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
      try {
        const movies=await Movie.find();
    
        res.status(201).json(movies.reverse());
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed!");
    }
  });

module.exports = router;
