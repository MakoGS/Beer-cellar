import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";

export default function BeersCard(props) {
  const beer = props.beer;
  return (
    <div>
      {" "}
      <Card bg="light" style={{ width: "20rem" }} className="shadow m-2">
        <Card.Header>
          <span>
            {beer.type} - {beer.style}
          </span>
        </Card.Header>
        <Card.Body>
          <Card.Title>
            <Link to={`/beer/${beer._id}`}>{beer.name}</Link>
          </Card.Title>
          <Card.Text>{beer.description}</Card.Text>
        </Card.Body>
        <Card.Footer>
          {beer.abv} - {beer.country}
        </Card.Footer>
      </Card>
    </div>
  );
}
