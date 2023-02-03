import PageHeader from "../../components/PageHeader/PageHeader";
import Axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./CryptoPricePage.css";

export default function CryptoPricesPage({handleLogout, loggedUser}) {
  //My to-do plan for api setup
    // import axios
  // get api data from coinstats
  // push the data that you get from the api and push it into an array
  //fix error with max 100+ top crypto displayed, check with Jim
  const [coinData, setCoinData] = useState([]);
const [search, setSearch] = useState('')
  useEffect(() => {
    Axios.get(
      `https://api.coinstats.app/public/v1/coins?skip=0&limit=100&currency=USD`
    ).then((res) => {
      setCoinData(res.data.coins);
    });
  }, []);
  <data className="push"></data>;

  return (
    <div className="App">
      <PageHeader handleLogout={handleLogout} loggedUser={loggedUser}/>
      <h1>All Cryptocurrencies</h1>
      { <input
        type="text"
        placeholder="Search..."
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      /> }
      <table>
        <thead>
          <tr>
            <td>Rank</td>
            <td>Name</td>
            <td>Symbol</td>
            <td>Market Cap</td>
            <td>Price</td>
            <td>Available Supply</td>
            <td>Volume(24hrs)</td>
          </tr>
        </thead>
        {/* Mapping all the cryptos */}
        <tbody>
          {/* Filtering to check for the searched crypto */}
          {coinData
            .filter((val) => {
              return val.name.toLowerCase().includes(search.toLowerCase());
            })
            .map((val, id) => {
              return (
                <>
                  <tr id={id}>
                    <td className="rank">{val.rank}</td>
                    <td className="logo">
                      <a href={val.websiteUrl}>
                        <img src={val.icon} alt="logo" width="30px" />
                      </a>
                       
<p>{val.name}</p>
 
                    </td>
                    <td className="symbol">{val.symbol}</td>
                    <td>${val.marketCap}</td>
                    <td>${val.price.toFixed(2)}</td>
                    <td>{val.availableSupply}</td>
                    <td>{val.volume.toFixed(0)}</td>
                  </tr>+
                </>
              );
            })}
        </tbody>
      </table>
    </div>
    // <div>
    //   {coinData.map((coinObj, index) => {
    //     return (
    //       <div key={index}>
    //         <h1>
    //           {console.log(coinObj)}
    //           {coinObj.name}
    //         </h1>
    //       </div>
    //     );
    //   })}
    // </div>
  );
}
