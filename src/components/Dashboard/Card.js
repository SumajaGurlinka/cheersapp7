import React, { useEffect } from "react";
import { Avatar, Box, Button, Divider, Tooltip } from "@mui/material";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MailIcon from "@mui/icons-material/Mail";
import { connect } from "react-redux";
import Typography from "@mui/joy/Typography";
import CancelIcon from '@mui/icons-material/Cancel';
import {
  TextField,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
} from "@mui/material";
import jwtDecode from "jwt-decode";
import InputAdornment from "@mui/material/InputAdornment";
import MarkunreadOutlinedIcon from "@mui/icons-material/MarkunreadOutlined";
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Received } from "../../data/Received";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Logout, RemoveShoppingCartSharp } from "@mui/icons-material";
import ListItemIcon from "@mui/material/ListItemIcon";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { IconButton } from "@mui/material";
import CustomizedIconButton from "../common/CustomizedIconButton";
import download1 from "../../assets/images/download1.png";
import teamsent from "../../assets/images/teamsent.png";
import downloadall from "../../assets/images/downloadall.png";
import download from "../../assets/images/download.png";
import DownloadIcon from "@mui/icons-material/Download";
import VisibilityIcon from "@mui/icons-material/Visibility";
import unviewed from "../../assets/images/un.png";
import vector from "../../assets/images/Vector (2).png";
import { receivedcards } from "../../store/receivedcards";
const Card = (props) => {
    const {card,receivedcards,user,getCardAsync } = props;
    const base64Image = card?.cardData?.cardImage;
    const navigate = useNavigate();
    const handleClose=()=>{
        navigate("/");
    }
    useEffect(() => {
        console.log("1");
        const urlParams = new URLSearchParams(window.location.search);
        console.log("2");
        const cardId = urlParams.get('id'); 
        console.log("card",cardId);

localStorage.setItem("Card",cardId);
    const handleCard = async () => {

      try {
       
        const data = {
          
            cardId:cardId
         
    
          };
       
       
        await getCardAsync(data);
       
       
      } catch (error) {
        
      }
   
     };
    
       
     handleCard();
         },    []);
  return (
    <>
           
      <Box>
        <Button>
        <Tooltip title="Close and return to dashboard">
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
                sx={{ position: "absolute", top: "10px", right: "-1150px" }}
              >
                <CancelIcon />
              </IconButton>
            </Tooltip>
        </Button>
        <card></card>
     </Box>
  

    <card
    style={{
      width: "700px",
      height: "450px",
      display: "flex",
      justifyContent: "center",
     marginLeft:"300px",
     marginTop:"60px",
      backgroundImage: `url(data:image/jpeg;base64,${base64Image})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    }}
  >
      
    </card></>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
  receivedcards:state.receivedcards,
  card:state.card
});
const mapDispatchToProps = (dispatch) => ({
  getDownloadAllAsync: dispatch.login.getDownloadAllAsync,
  getReceivedCardsAsync:dispatch.receivedcards.getReceivedCardsAsync,
  getReceivedCardIdAsync:dispatch.receivedcards.getReceivedCardIdAsync,
  getReceivedAppreciationAsync:dispatch.receivedcards.getReceivedAppreciationAsync,
  getReceivedThankingAsync:dispatch.receivedcards.getReceivedThankingAsync,
  getCardAsync:dispatch.card.getCardAsync
});
export default connect(mapStateToProps, mapDispatchToProps)(Card);
