import { useEffect } from "react";
import React, { useState, useRef } from "react";
import { Radio } from "@mui/joy";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Dialog, DialogTitle, DialogContent, DialogActions, Hidden } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ReactQuill from "react-quill";
import jwtDecode from "jwt-decode";
import Autocomplete from '@material-ui/lab/Autocomplete';
import "react-quill/dist/quill.snow.css";
import CircularProgress from '@mui/material/CircularProgress';
import { Box, Divider } from "@mui/material";
import { toast } from "react-toastify";
import Tooltip from "@mui/material/Tooltip";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/joy/Typography";
import { TextField, Paper, Avatar, Button } from "@mui/material";
import { Logout } from "@mui/icons-material";
import ListItemIcon from "@mui/material/ListItemIcon";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import { Associates } from "../../data/Associates";
import { Category } from "../../data/Category";
import { Select, FormControl, InputLabel } from "@mui/material";
import { IconButton } from "@mui/material";
import { connect } from "react-redux";
import { useLocation } from 'react-router-dom';
import html2canvas from "html2canvas";


const Category1 = Category;
const styles = {
  scrollbar: {
    width: "8px",
  },
  thumb: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: "10px",
  },
};

// function CustomPlaceholder() {
//   return (
//     <div
//       style={{
//         position: "absolute",
//         top: 0,
//         left: 0,
//         right: 0,
//         bottom: 0,
//       }}
//     ></div>
//   );
// }
const SendCards = (props) => {
  const username = "Sumaja Gurlinka";
  const navigate = useNavigate();
  const appreciate = "appreciate";
  const location = useLocation();
  const { user, setEdit1, getSubmitAsync, getSaveAsync, edit, login, getAssociateAsync, associate } = props;
  const [searchText, setSearchText] = useState();
  const [timeOfDay, setTimeOfDay] = useState("");
  const [sortOrder, setSortOrder] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [associates, setAssociates] = useState();
  const [exceedLines, setExceedLines] = useState(false);
  const [category, setCategory] = useState(Category1[0]);
  const [showPreview, setShowPreview] = useState(false);
  const [editorHtml, setEditorHtml] = useState("");
  const quillRef = useRef(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showClearButton, setShowClearButton] = useState(false);
  const [subjectError, setSubjectError] = useState(false);
  const [showTextbox, setShowTextbox] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const maxCharacterLimit = 201;
  const maxLines = 5;
  const [progress, setProgress] = useState(0);
  const [readOnly, setReadOnly] = useState(false);
  const hiddenDataContentRef = useRef(null);
  const [remainingCharacters, setRemainingCharacters] =
    useState(maxCharacterLimit);
  const ass = associate.associateName;
  const [selectedThemeBackground, setSelectedThemeBackground] = useState("");

  const [formValues, setFormValues] = useState({
    subject: {
      value: "",
      error: false,
    },
  });

  const themes = [
    {
      name: "Theme 1",
      background:
        "https://th.bing.com/th/id/OIP.bl5aVQ1KQRCZks1DB2iuRwHaEo?w=270&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    },
    {
      name: "Theme 2",
      background:
        "https://th.bing.com/th/id/OIP.HuEUrfP29dNvoD2Y3QJ1lQHaEo?w=260&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7",
    },
    {
      name: "Theme 3",
      background: "https://wallpapercave.com/wp/wp2308442.jpg",
    },
  ];

  const takeScreenshot = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    // Access the Quill editor instance
    const quill = quillRef.current && quillRef.current.getEditor();
  
    // Disable the toolbar
    if (quill && quill.getModule('toolbar')) {
      quill.getModule('toolbar').disable();
    }
  
    const canvas = await html2canvas(hiddenDataContentRef?.current, {
      allowTaint: true,
      useCORS: true,
      onclone: (clonedDoc) => {
        clonedDoc.getElementById("previewScreenShot").style.display = "block";
      },
    });
  
    // Enable the toolbar back after taking the screenshot
   
  
    const tempImage = canvas.toDataURL("image/jpeg");
    return tempImage;
  };
  



  useEffect(() => {

    console.log("searchtext", searchText);
  }, [searchText]);
  const handleEdit = () => {
    if (user.edit1) {


      setSearchText(edit.editData.receiverName);
      setCategory(edit.editData.category);
      setEditorHtml(edit.editData.cardMessage);
    }
  };
  useEffect(() => {
    // This effect will run when user.Edit1 changes to true
    handleEdit()
  }, [user.edit1, associate.associateData?.length]);

  useEffect(() => {
    const handleAssociate = async () => {
      try {
        if (searchText) {
          const data = {
            associateName: searchText
          };
          console.log("data", data);
          await getAssociateAsync(data);
        }
      } catch (error) {

      }
    };


    handleAssociate();
  }, [searchText]);
  const handleChange = (e) => {
    const { name, value } = e.target;


    if (name === "subject" && value.length > 50) {

      const truncatedValue = value.slice(0, 50);

      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        [name]: {
          ...prevFormValues[name],
          value: truncatedValue,
          error: false,
        },
      }));
    } else {

      setFormValues((prevFormValues) => ({
        ...prevFormValues,
        [name]: {
          ...prevFormValues[name],
          value,
          error: false,
        },
      }));
    }


    setShowClearButton(false);
  };

  const handleAvatarClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    console.log("ass", searchText);
  }, [searchText]);
  useEffect(() => {
    console.log("Read", readOnly);
  }, [readOnly]);


  // const handleChange1 = (html) => {

  //   // Create a temporary DOM element (e.g., a <div>) to parse the HTML

  //   const tempElement = document.createElement("div");

  //   tempElement.innerHTML = html;

  //   // Extract the text content from the temporary element

  //   const textContent = tempElement.textContent;

  //   console.log(textContent); // Output: Extracted plain text content

  //   if (textContent.length <= maxCharacterLimit) {

  //     setEditorHtml(html);

  //     setRemainingCharacters(maxCharacterLimit - textContent.length);

  //   } else {

  //     // If the character limit is reached, prevent further editing

  //     // You can add a condition to check if the editor is not already read-only

  //     if (!readOnly) {

  //       setReadOnly(true);

  //     }

  //   }

  // };

  // const handleChange1 = (content, delta, source, editor) => {

  //   const quillInstance = quillRef.current.getEditor();

  //   const deltaOps = quillInstance.getContents().ops;

  //   let totalCharacters = 0;

  //   let lines = 0;

  //   deltaOps.forEach((op) => {

  //     if (op.insert && typeof op.insert === 'string') {

  //       totalCharacters += op.insert.length;

  //       // Check for new line characters

  //       const newLines = op.insert.match(/\n/g);

  //       lines += newLines ? newLines.length : 0;

  //     }

  //   });

  //   console.log('Total Characters:', totalCharacters);

  //   console.log('Lines:', lines);

  //   console.log('Content:', content);

  //   // Check if the last operation is an insert and contains a new line character

  //   const lastOp = deltaOps[deltaOps.length - 1];

  //   const isLastOpSingleCharacter = lastOp && lastOp.insert && lastOp.insert.length === 1;

  //   if (totalCharacters <= maxCharacterLimit) {

  //     if (isLastOpSingleCharacter && source === 'user' && lines >= maxLines) {

  //       // If the last operation is a single character and it's from the user, allow typing on the current line

  //     } else if (lines >= maxLines) {

  //       // If the maximum line limit is reached, prevent the insertion of a new line character

  //       quillInstance.deleteText(totalCharacters - 1, 1);

  //       lines--; // Decrement the line count to allow typing on the current line

  //     }

  //     setReadOnly(false);

  //     setEditorHtml(content);

  //     setRemainingCharacters(maxCharacterLimit - totalCharacters);

  //   } else if (!readOnly) {

  //     setReadOnly(true);

  //   }

  // };
 const handleChange1 = (content, delta, source, editor) => {
  
    const quillInstance = quillRef.current.getEditor();
  
    const deltaOps = quillInstance.getContents().ops;
   
    let totalCharacters = 0;
  
    let lines = 0;
   
    deltaOps.forEach((op) => {
  
      if (op.insert && typeof op.insert === 'string') {
  
        totalCharacters += op.insert.length;
   
        // Check for new line characters
  
        const newLines = op.insert.match(/\n/g);
  
        lines += newLines ? newLines.length : 0;
  
      }
  
    });
   
    console.log('Total Characters:', totalCharacters);
  
    console.log('Lines:', lines);
  
    console.log('Content:', content);
   
    // Check if the last operation is an insert and contains a new line character
  
    const lastOp = deltaOps[deltaOps.length - 1];
  
    const isLastOpSingleCharacter = lastOp && lastOp.insert && lastOp.insert.length === 1;
   
    if (totalCharacters <= maxCharacterLimit) {
  
      if (isLastOpSingleCharacter && source === 'user' && lines >= maxLines) {
  
        // If the last operation is a single character and it's from the user, allow typing on the current line
  
      } else if (lines >= maxLines) {
  
        // If the maximum line limit is reached, prevent the insertion of a new line character
  
        quillInstance.deleteText(totalCharacters - 1, 1);
  
        lines--; // Decrement the line count to allow typing on the current line
  
      }
   
      setReadOnly(false);
  
      setEditorHtml(content);
  
      setRemainingCharacters(maxCharacterLimit - totalCharacters);
  
    } else if (!readOnly) {
  
      setReadOnly(true);
  
    }
  
  }; 

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const handleCancel = () => {
    setConfirm(true);
  };
  const handleClearClick = () => {
    setEditorHtml("");
    if (quillRef.current) {
      quillRef.current.getEditor().setText("");
      window.location.reload();
    }
  };
  const handleAssociateChange = (e) => {
    setAssociates(e.target.value);
  };

  const handleSave = async () => {
    try {
      const id = localStorage.getItem("ID");
      const token = localStorage.getItem("token");
      const base64 = localStorage.getItem("base64");
      const userDetails = jwtDecode(token);
      const data = {
        senderName: userDetails.full_name,
        cardId: id,
        receiverName: searchText,
        category: category,
        cardMessage: editorHtml,
        cardImage: base64
      };

      console.log("data", data);

      await getSaveAsync(data);
      toast.success("Card saved successfully");
      localStorage.setItem("ID", 0);
      setSearchText("");
      setCategory("");
      setEditorHtml("")

    } catch (error) {

    }

  };


  const handleCloseDialog = () => {
    setShowPreview(false);
  };

  const handlePreviewClick = () => {
    setShowPreview(true);
  };
  const handleClose = () => {

  };
  const handleDiscard = () => {
    setConfirm(false);
  };
  const handleConfirm = () => {
    setConfirm(false);
    navigate("/home1");
    sessionStorage.removeItem("selectedIndex");

  }


  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const tempImage = await takeScreenshot();
      const imagebase64 = tempImage.substring(0 + "data:image/jpeg;base64,".length);
      const token = localStorage.getItem("token");
      const userDetails = jwtDecode(token);
      console.log("image", imagebase64);
      const data = {
        senderName: userDetails.full_name,
        receiverName: searchText,
        category: category,
        cardMessage: editorHtml,
        cardImage: imagebase64
      };
      const payload1 = (data);

      await getSubmitAsync(payload1);
      setIsLoading(false);
      toast.success("Card send successfully");
      navigate("/home1");

    } catch (error) {
      setIsLoading(false);
    }

  };
  const handleSearchChange = (event) => {

    setSearchText(event.target.value);
  };




  return (
    <Box
      style={{
        background: "#f5f5f5",
        width: user.toogle ? "95%" : "100%",
        marginTop: "60px",
        height: "100vh",
        paddingTop: "14px",
      }}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        {" "}
        <Typography
          level="title-md"
          sx={{
            color: "black",
            fontSize: "20px",
            fontFamily: "Manrope, sans-serif",
            fontWeight: "bold",
            marginLeft: "22px",
            marginBottom: "10px",
          }}
        >
          Send Card
        </Typography>

      </Box>
      <Box
        component={Paper}
        sx={{
          height: "92%",
          width: "96%",
          background: "#FCFCFC",
          marginLeft: "20px",
          marginRight: "28px",

          overflowY: "auto",
          "&::-webkit-scrollbar": styles.scrollbar,
          "&::-webkit-scrollbar-thumb": styles.thumb,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginRight: "20px",
            marginLeft: "20px",
            paddingTop: "20px",
          }}
        >
          <Typography
            sx={{ fontWeight: "bold", marginLeft: "25px", marginRight: "25px" }}
          >
            Associate
          </Typography>
          <FormControl
            fullWidth
            variant="outlined"
            sx={{
              marginBottom: "8px",
              marginLeft: "25px",
              marginRight: "18px",
            }}
          >
            <Autocomplete
              fullWidth
              options={associate.associateData}
              value={searchText}
              getOptionLabel={(option) => (option && option.associateName)}

              onInputChange={(event, newInputValue) => {
                setSearchText(newInputValue);
              }}
              renderInput={(params) => (
                <TextField {...params} label="Select Associate" variant="outlined" />
              )}
            />

          </FormControl>

        </Box>


        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginRight: "20px",
            marginLeft: "20px",
            paddingTop: "5px",
          }}
        >
          <Typography
            sx={{ fontWeight: "bold", marginLeft: "25px", marginRight: "30px" }}
          >
            Category
          </Typography>
          <FormControl
            fullWidth
            variant="outlined"
            sx={{
              marginBottom: "5px",
              marginLeft: "15px",
              marginRight: "28px !important",
            }}
          >
            <InputLabel sx={{ marginLeft: "10px" }}>Select Category</InputLabel>
            <Select
              fullWidth
              label="Select Category"
              variant="outlined"
              sx={{
                marginLeft: "10px",
                marginRight: "80px",
                height: "46px",
              }}
              size="small"
              onChange={handleCategoryChange}
              value={category}
            >
              {Category1.map((category, index) => (
                <MenuItem key={index} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>




        <div
          style={{
            marginLeft: "26px",
            marginRight: "10px",
            paddingLeft: "18px",
            paddingRight: "20px",
            paddingTop: "15px",
          }}
        >
          <div style={{}}>
            <ReactQuill  className="editor"
              ref={quillRef}
              value={editorHtml}
              readOnly={readOnly}
              onChange={handleChange1}
              style={{
                height: '230px',
                width: user.toogle ? '100%' : '910px',
                whiteSpace: 'normal',
                backgroundSize: 'auto 100%',
                backgroundRepeat: 'no-repeat',
               // whiteSpace: "pre-wrap",
      wordWrap: "break-word",
              }}
              placeholder="Enter your text here..."
              modules={{
                toolbar: {
                  container: [
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    [{ align: [] }],
                    ["clean"],
                    [{ color: [] }, { background: [] }],
                  ],
                },
              }}
            />
          </div>
          {showClearButton ? (
            <Button
              size="small"
              sx={{
                position: "absolute",
                color: "#0071e3",
                marginTop: "20px !important",
                fontSize: "15px",
                textTransform: "none",
              }}
              onClick={handleClearClick}
            >
              Clear
            </Button>
          ) : (
            <Button
              size="small"
              sx={{
                position: "absolute",
                color: "#0071e3",
                top: "44%",

                right: "70px",
                fontSize: "15px",
                textTransform: "none",
              }}
              onClick={handleClearClick}
            >
              Clear
            </Button>
          )}
        </div>

        <p
          style={{
            position: "absolute",
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "42px",
            fontSize: "12px",
            left: "1100px"
          }}
        >
          {remainingCharacters} characters left{" "}
        </p>

        <div style={{ marginTop: "70px", marginLeft: "50px", display: "flex", alignItems: "center" }}>

          <div style={{ marginLeft: "auto" }}>
            <Button style={{ background: "#0071e3", color: "#FCFCFC", borderRadius: "8px", textTransform: "none", marginRight: "10px", border: "1px solid #0071e3", width: "80px" }} onClick={handleSave}>
              Save
            </Button>
            <Button style={{ background: "#FCFCFC", color: "#0071e3", borderRadius: "8px", textTransform: "none", marginRight: "10px", border: "1px solid #0071e3", width: "80px" }} onClick={handleCancel}>
              Cancel
            </Button>

            <Button style={{ background: "#0071e3", color: "#FCFCFC", borderRadius: "8px", textTransform: "none", marginRight: "32px", width: "80px" }} onClick={handlePreviewClick}>
              Next
            </Button>

          </div>
        </div>

        <Dialog open={confirm}>
          <DialogTitle>Cancel </DialogTitle>
          <DialogContent>

            Are you sure you want to cancel the changes?
          </DialogContent>
          <DialogActions>
            <Button style={{ background: "#0071e3", color: "#FCFCFC", borderRadius: "8px", textTransform: "none", width: "80px" }} onClick={handleDiscard}>
              Discard
            </Button>
            <Button style={{ background: "#0071e3", color: "#FCFCFC", borderRadius: "8px", textTransform: "none", width: "80px" }} onClick={handleConfirm}>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>



        <Dialog open={showPreview}>
          <DialogContent
            style={{
              backgroundImage: `url("https://th.bing.com/th/id/OIP.bl5aVQ1KQRCZks1DB2iuRwHaEo?w=270&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7")`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center top",
              width: "500px",
              height: "450px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
            }}
          >
            <Tooltip title="Close">
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleCloseDialog}
                aria-label="close"
                sx={{ position: "absolute", top: "10px", right: "15px" }}
              >
                <CloseIcon />
              </IconButton>
            </Tooltip>
            <div
              style={{
                width: "500px",
                height: "400px",
                paddingTop: "12px",
                color: "black",
                paddingBottom: "20px",
                overflow: "auto",
                wordBreak: "break-word",
              }}
            >

              {editorHtml}

            </div>
            <Button onClick={handleSubmit}>submit</Button>
            {/* {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <CircularProgress />
          </div>
        ) : (
          <Button
            style={{ background: "#0071e3", color: "#FCFCFC", borderRadius: "5px", textTransform: "none", marginBottom: "2px", width: "70px",position:"relative",top:"190px" }}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        )} */}
          </DialogContent>
        </Dialog>


      </Box>{" "}
      <Menu
        placement="bottom-end"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        sx={{ marginTop: "1.43em" }}
      >
        <MenuItem>
          <div>
            <Typography sx={{ color: "black" }}>Sumaja Gurlinka</Typography>
            <Typography sx={{ fontSize: "14px", marginTop: "5px" }}>
              Associate
            </Typography>
            <Typography sx={{ color: "black" }}>
              sumajagurlinka22@gmail.com
            </Typography>
          </div>
        </MenuItem>

        <Divider></Divider>
        <MenuItem>
          {" "}
          <ListItemIcon sx={{ marginRight: "5px", fontSize: "20px" }}>
            <Logout size="sm" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>




      <div id="previewScreenShot" ref={hiddenDataContentRef}>
  <ReactQuill
    key="editor2"
    className="editor"
    ref={quillRef}
    value={editorHtml}
    style={{
      
      height: 'auto',
      width: user.toogle ? '100%' : '910px',
      backgroundSize: 'auto 100%',
      backgroundRepeat: 'no-repeat',
      backgroundImage: `url("https://th.bing.com/th/id/OIP.bl5aVQ1KQRCZks1DB2iuRwHaEo?w=270&h=180&c=7&r=0&o=5&dpr=1.5&pid=1.7")`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center top",
      borderBottom: "none !important",
      whiteSpace: "pre-wrap",
      wordWrap: "break-word",
    }}
    modules={{
      toolbar: false, 
      clipboard: {
        matchVisual: false,
      },
      keyboard: {
        bindings: {
          
        },
      },
    }}
  />
</div>

    </Box>
  );
}
const mapStateToProps = (state) => ({
  user: state.user,
  edit: state.edit,
  login: state.login,
  associate: state.associate
});
const mapDispatchToProps = (dispatch) => ({

  setEdit1: dispatch.user.setEdit1,
  getSubmitAsync: dispatch.login.getSubmitAsync,
  getSaveAsync: dispatch.login.getSaveAsync,
  getAssociateAsync: dispatch.associate.getAssociateAsync

});
export default connect(mapStateToProps, mapDispatchToProps)(SendCards);