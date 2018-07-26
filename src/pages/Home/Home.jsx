import React, { Component } from "react";
import ChakibooListContainer from "../../components/ChakibooListContainer";
import { gql } from "apollo-boost";
import { Query } from "react-apollo";

const GET_CHAKIBOOS = gql`
  query {
    chakiboos {
      id
      title
      description
      author {
        username
      }
    }
  }
`;

class Home extends Component {
  parseData = data => {
    // console.log(data.chakiboos);
    data.chakiboos.forEach( d => 
      d.author.username = "Ramzi"
    );
    return data;
  }
  
  render() {
    return (
      <Query query={GET_CHAKIBOOS}>
        {({ loading, error, data }) => {
          if (loading) return <div>Loading...</div>;
          if (error) return <div>Error :(</div>;
          return <ChakibooListContainer data={data} />;
        }}
      </Query>
    );
  }
}

export default Home;
