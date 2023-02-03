import { Link } from "react-router-dom";
import { Header, Segment, Image, Icon } from "semantic-ui-react";
import "./PageHeader.css";

function PageHeader({ loggedUser, handleLogout }) {
  return (
    <Segment clearing>
      <Header as="h3" floated="right"> 
        <Link to="/">
          <Icon name="compass" color='black'></Icon>  </Link> 
        <Link to="/CryptoPricesPage">
               <div>Crypto Prices</div>
        </Link> 

        <Link to="/FearAndGreedIndex">
               <div>Fear And Greed Index</div>
        </Link> 

        <Link to="" onClick={handleLogout}>
          <div>Logout</div>
        </Link>
      </Header>
      
      <Header as="h2" floated="left">
        <Link to={`/${loggedUser?.username}`}>
          <Image
            src={
              loggedUser?.photoUrl
                ? loggedUser?.photoUrl
                : "https://react.semantic-ui.com/images/wireframe/square-image.png"
            }
            avatar
          ></Image>
          
        </Link>
      </Header>
    </Segment>
  );
}



export default PageHeader;
