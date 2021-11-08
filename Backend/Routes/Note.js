const express = require("express");
const router = express.Router();
const fetchuser = require("../Middleware/fetchuser");
const Notes = require("../Models/Notes");
const { body, validationResult } = require("express-validator");

//Route 1: Get all the Notes using: GET "/api/note/fetchnotes".
router.get("/fetchnotes", fetchuser, async (req, res) => {
    try {
        
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
      res.status(500).send("Can't get all Notes, Something went wrong! ");
    }
    });
//Route 2: Create a new note using: POST "/api/note/createnote".

router.post(
  "/createnote",
  fetchuser,
  [
    body("title", "enter a valid title").isLength({ min: 3 }),
    body("description","enter a valid description of atleatst 10 chars"
    ).isLength({ min: 5 }),
    body("tag", "enter a valid tag").isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //If there are errors return bad requests and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      // const notes=await Notes.find({user: req.user.id})
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id
      });
      const savenote = await note.save();
      res.json(savenote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Can't create a Note, Something went wrong!");
    }
  }
  );
  
  //Route 3: Update a existing note using: PUT "/api/note/updatenote/:id".
  router.put(
    "/updatenote/:id",fetchuser,async (req, res) => {
      const { title, description, tag } = req.body;
      // Create a newnote object
      const newNote={}
      if(title) {newNote.title=title}
      if(description) {newNote.description=description}
      if(tag) {newNote.tag=tag}

      //Find the note to be deleted and delete it.
      let note= await Notes.findById(req.params.id)
      if(!note){return res.status(404).send("Not Found")}

      // if(note.user.toString() !== req.user.id){
      //   return res.status(401).send("Not Allowed")
      // }
      note=await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
      res.json(note)
      console.log("Note Updated Successfully")
    })
    
  //Route 4: Delete a note using: DELETE "/api/note/deletenote/:id".
  router.delete(
    "/deletenote/:id",fetchuser,async (req, res) => {
      
      //Find the note to be updated and update it.
      let note= await Notes.findById(req.params.id)
      if(!note){return res.status(404).send("Not Found")}
      
      //Allow deletion only if the user owns the note
      // if(note.user.toString()!== req.user.id){
      //   return res.status(401).send("Not Allowed")
      // }
      note= await Notes.findByIdAndDelete(req.params.id)
      res.json({"Successfully deleted":"ok", note:note})
      console.log("Note Deleted Successfully")
    })
    module.exports = router;
    