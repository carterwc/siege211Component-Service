import React, { Component } from 'react';

const styles = {
	parentComment: {
    display: 'flex',
    flexDirection:'column',
    borderRadius: '25px',
    minHeight: '40px',
    padding: '6px',
    color: '#797c7f',
    marginBottom: '6px'
  },
  dateSpan: {
    display: 'flex',
    flexDirection:'row',
    justifySelf: 'flex-end',
    alignSelf: 'flex-end',
  },
  userSpan: {
    alignSelf: 'flex-start',
    justifySelf: 'flex-start'
  },
  userDateDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  textContentSpan: {
    color: 'black',
    fontSize: '16px',
    display: 'flex',
    alignContent: 'flex-start',
    paddingLeft: '4px'
  }
}
class ParentComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
    	hover: false
    }
  }
    mouseOver(){
    console.log('mouseover!');
  }

  mouseOut(){
    console.log('mouseOut');
  }
  render() {
  	return (
  		<div 
        style={styles.parentComment} 
        onMouseOver={() => this.mouseOver()}
        onMouseOut={()=>this.mouseOut()}>
        {this.props.children}
            
      </div>
  	)
  }
}

export default ParentComment;