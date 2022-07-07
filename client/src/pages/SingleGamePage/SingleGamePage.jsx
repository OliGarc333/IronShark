import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import AuthenticationContext from '../../context/authentication';
import ProfileCard from '../../components/ProfileCard';
import { gameLoad } from '../../services/games';
import { gameDelete } from '../../services/games';

const formatPrice = (price) =>
  new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(
    price
  );

const SingleGamePage = () => {
  const { id } = useParams();

  const [game, setGame] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    gameLoad(id).then((data) => setGame(data.game));
  }, [id]);

  const handleGameDelete = () => {
    gameDelete(id, game).then((data) => {
      navigate(`/`);
    });
  };

  const { user } = useContext(AuthenticationContext);

  return (
    <div>
      {game && (
        <>
          <h1>{game.title}</h1>
          <h3>{game.gameUrl}</h3>
          <h3>{game.description}</h3>
          <h3>{game.genre}</h3>
          {console.log(game.screenshots)}
          {game.screenshots.map((value) => (
            <img src={value} alt={value} />
          ))}
          {/* <img src={game.screenshots[0]} alt={game.screenshot} />
          <img src={game.screenshots[1]} alt={game.screenshot} /> */}
          <h3>{formatPrice(game.price)}</h3>
          <ProfileCard profile={game.owner} />
          <Link to="/checkout" state={{ price: game.price }}>
            <button>Buy Now</button>
          </Link>
          {user && game.owner._id === user._id && (
            <Link to={`/game/${id}/edit`}> Edit Game</Link>
          )}

          {user && game.owner._id === user._id && (
            <button onClick={handleGameDelete}> Delete Game</button>
          )}
        </>
      )}
    </div>
  );
};

export default SingleGamePage;

//  {/* title: '', ✅
//       gameUrl: '', ✅
//       description: '',
//       genre: '', ✅
//       price: 'num', ✅
//       cover: '', ✅
//       screenshots: '', ✅
//       trailer: '' */}✅
