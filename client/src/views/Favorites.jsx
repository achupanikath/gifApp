import React from 'react';
import Display from '../common/Display';
import request from 'superagent';

export default class Favorites extends React.Component{

  constructor(){
    super();

    this.state={
      data: [],
      label: "Delete from Favorites"
    }
  }


  componentDidMount = () => {
    request
    .get('http://localhost:3000/favorites')
    .end((err,res) => {
      if(err)
      {
        console.log("error in mounting api", err);
        return;
      }
      else if(res.ok){
          console.log("the favorites data is", res.body);
            this.setState({
            data: res.body
       }); 
      }
    });
  } 

  deleteFromFavorites = () => {
    /*insert deletion code here */
  }

  render(){
      return (
        <div>
          <h2>{"Favorites :"}</h2>
              {(this.state.data.length>0) ? this.state.data.map((item, index) => 
                         {return  (<Display item = {item} key = {index} label = {this.state.label} actionFunction = {this.deleteFromFavorites} />)}) 
               
                              : 'YOU HAVEN\'T ADDED ANYTHING TO FAVORITES YET!'}
                            }

      </div>)
  }
}
