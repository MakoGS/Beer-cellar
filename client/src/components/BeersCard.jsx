import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function BeersCard(props) {
  const beer = props.beer;
  return (
    <div>
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
          <Card.Text>
            Uploaded by:{" "}
            <Link to={`profile/${beer._createdBy.username}`}>
              {beer._createdBy.username}
            </Link>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          {beer.abv} - {beer.country}
        </Card.Footer>
      </Card>
    </div>
  );
}
