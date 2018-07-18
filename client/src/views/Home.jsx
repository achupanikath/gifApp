import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Display from '../common/Display';
import request from 'superagent';

export default class Home extends React.Component{

  constructor()
  {
    super();
    this.state={
      data: [],
      query: "",
      label: "Add to Favorites"
    }
  }

  handleSearch = (event, value) => {
    let search=event.target.value;
    this.setState({query: search});
  }

  handleTrending = () => {
    request
    .get('http://localhost:3000/trending')
    .end((err,res) => {
      if(err){
        console.log("error in api", err);
        return;
      }
      if(res.ok){
        this.setState({
        data: JSON.parse(res.text),
        label: "Add"
        }); 
      }
    });
  }

  handleQuery = () => {
    console.log("The state is",this.state.query);
    request
    .get('http://localhost:3000/gifs')
    .query({search: this.state.query})
    .end((err, res) => {
      if(err){
        console.log("error in api ", err);
        return;
      }
      if(res.ok){
        console.log("test 4",res);
        this.setState({
          data: JSON.parse(res.text),
          label: "Add"
        });
      }
    }); 
  }

  // display = () => {
  //   console.log("test 6",this.state.data);
  //   let select=this.state.data;
  //   select.map((item,index) => {
  //     console.log("Item is",item);
  //     return  <Display item = {item} index = {index} label = {this.state.label} actionFunction = {this.addToFavorites}/>
  //   })
  // }

  addToFavorites = (item) => {
    request
    .post('http://localhost:3000/fav')
    .send({
      id: item.id,
      rating: item.rating,
      source: item.source,
      images: item.images,
      title: item.title
      })
    .end((err, res) => {
      if(err) {
        alert( "Failed to add gif to favorites");
      }
      
      alert("Gif added to favorites");
    });
  }

  render(){
     return (
       <div>
       <TextField
       hintText="eg: marvel"
       floatingLabelText="Search for gifs here"
       onChange={this.handleSearch}
       />
       <RaisedButton label="Search" primary={true}  onClick={this.handleQuery}/>
       <br/>
       <br/>
       <RaisedButton label="Trending" primary={true} onClick={this.handleTrending}/>
       <br/>
         {(this.state.data.length>0) ? this.state.data.map((item, index) => 
           {return  (<Display item = {item} key = {index} label = {this.state.label} actionFunction = {this.addToFavorites} />)}) 
 
                 : 'PLEASE SELECT OR SEARCH FOR GIFS!'}
     </div>
    )
  }
}

