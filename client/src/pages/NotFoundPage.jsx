import { Link } from "react-router-dom";
import NavbarHome from "../components/NavbarHome";
import notFoundPicture from '/images/404-error.jpg';

export default function NotFoundPage() {
    const style = {
        marginTop:"5%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItem:"center",
        gap:"20px",
    }
    const imageStyle = {
        width: "100vh",
        height: "auto",
        margin:"auto"
    }
    const homeStyle = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItem:"center",
        marginTop:"10%"
    }
  return (
    <div className="home" style={{homeStyle}}>
      <NavbarHome />
      <div style={style}>
        <img src={notFoundPicture} alt="error-page" height={100} width={100} style={imageStyle} />
        <p style={{margin:"auto"}}>Opps! Looks like You're lost, please go <Link to="/" style={{textDecoration:"underline", fontWeight:"bold"}}>back</Link></p>
      </div>
    </div>
  );
}
