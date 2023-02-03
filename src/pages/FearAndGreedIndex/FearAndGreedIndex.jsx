import PageHeader from "../../components/PageHeader/PageHeader";
import { Header, Segment, Image, Icon } from "semantic-ui-react";
import "./FearAndGreedIndex.css";




 function FearAndGreedIndex({handleLogout, loggedUser}) {

return(
    <div> <PageHeader handleLogout={handleLogout} loggedUser={loggedUser}/> 

<Image centered='true' src="https://alternative.me/crypto/fear-and-greed-index.png"/></div>
)
}
export default FearAndGreedIndex
