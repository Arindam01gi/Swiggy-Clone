import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {
        name: "Dummy Name",
        location: "Default",
        avatar_url: "avartar"
      },
    };
  }
  async componentDidMount() {
    console.log("did mount called");

    const data = await fetch("https://api.github.com/users/Arindam01gi");
    const json = await data.json();

    this.setState({
      userInfo : json,
    });

    console.log(json);
  }

  componentDidUpdate(){
    console.log("Did update called");
  }
  render() {

    const {name , login , avatar_url} = this.state.userInfo;

    // console.log(this.state.userInfo.location);

    return (
      <div>
        <h2>Name : {name} </h2>
        <h4>username: {login}</h4>
        <img src= {avatar_url} />
        <p>arindammaiti2018@gmail.com</p>
      </div>
    );
  }
}

export default UserClass;
