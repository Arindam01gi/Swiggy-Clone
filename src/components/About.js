import React from "react";
import User from "./User";
import UserClass from "./UserClass";
import UserContext from '../utils/UserContext';



class About extends React.Component{
    constructor(props){
        super(props)

        // console.log("Parent render");
    }

    componentDidMount(){
        // console.log("parent Mounting");
    }
    render(){
        return(
            <div className="relative top-20">
                <h1>About Class Component</h1>
                <div>
                    loggedInUser:<span><UserContext.Consumer>
                        {(data)=> <h4 className="font-bold"> {data.loggedInUser}</h4>}
                    </UserContext.Consumer>
                    </span>
                        
                    
                </div>
            <h1>About</h1>
            <UserClass name={"Arindam Maiti(class)"}/>
        </div>
        );
        
    };
}

  

export default About;