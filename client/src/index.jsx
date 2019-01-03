import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
const styles = {
  app: {
    paddingTop: 40,
    textAlign: 'center',
    border: '#becde5 1px solid',
    borderRadius: '5px',
    marginLeft: '15px'
  },
  parentComment: {
    display: 'flex',
    flexDirection:'column',
    border: '#becde5 1px solid',
    borderRadius: '25px',
    minHeight: '40px',
    padding: '6px',
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
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {comments: [{dateCreated: '15',user:'shaggy',textContent:'nope'}]};
  }
  componentDidMount() {
    axios.get('/api/comments')
    .then(response => {
      console.log("Array of comments: ",response.data);
      this.setState({comments: response.data});
    })
    .catch(err => {
    console.log(err)
    })
  }

  render() {
    return (
      <div style={styles.app} id='app'>
        {this.state.comments.map((comment,i) => {
          let date = comment.dateCreated;
        return (
          <div style={styles.parentComment} key={`comment#${i}`}>
            

            <div style={styles.userDateDiv}>
              <span>{comment.user}</span>
              <span style={styles.dateSpan}>{`${date.substring(0,10)}: ${date.substring(11,16)}`}</span>
              
            </div>
            


            <div>{comment.textContent}</div>
      </div>
        )
      })}
      </div>
    )
  }
}

const root = document.querySelector('#app')
ReactDOM.render(<App />, root)

export default App;