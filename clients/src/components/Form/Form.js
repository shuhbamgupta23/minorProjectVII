import React from "react";
import useStyle from "./styles";
import {
  TextField,
  Typography,
  Button,
  Paper,
  FormHelperText,
} from "@material-ui/core";
import { useState } from "react";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import { createPost, updatePost } from "../../actions/posts";
import { useSelector } from "react-redux";
import { useEffect } from "react";
const Form = ({ currentId, setCurrentId }) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  );
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    creator:"",
    tags: "",
    selectedFile: "",
  });
  const user = JSON.parse(localStorage.getItem("profile"));


  const [name, setName] = useState(null);

  setTimeout(() => {
    if (user) {
      if (user.token.length < 500) {
        setName(user.result.name);
      } else {
        setName(user.user.displayName);
      }
    }
  }, 100);

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  if (!name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memory and like other memories!!
        </Typography>
      </Paper>
    );
  }
 
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if(user?.result?._id == undefined){
        setPostData(postData.creator = user.user.uid)
    }else{
        setPostData(postData.creator = user.result._id)
    }
    
    if (currentId) {
      dispatch(updatePost(currentId, { ...postData, name: name }));
    } else 
      dispatch(createPost({ ...postData, name: name }));
    clear();
  };
  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };

  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography varient="h6">
          {currentId ? "Editing" : "Creating"} a Memory
        </Typography>
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        ></TextField>
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        ></TextField>
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        ></TextField>
        <FormHelperText>
          Use , as seperator for tags without any spaces
        </FormHelperText>
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          ></FileBase>
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button
          variant="contained"
          size="small"
          type="submit"
          color="secondary"
          onClick={clear}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  );
};

export default Form;
