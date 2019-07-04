class App extends React.Component {
    constructor() {
        super();
        this.state = {
            searchText: '',
            users: []
        };
    }
  
    onChangeHandle(event) {
        this.setState({searchText: event.target.value});
    }
  
    onSubmit(event) {
        event.preventDefault();
        const {searchText} = this.state;
        const url = `https://api.github.com/search/users?q=${searchText}`;
        fetch(url)
            .then(response => response.json())
            .then(responseJson => this.setState({users: responseJson.items}));
    }
  
    render() {
        const divStyle = {
            maxWidth: '400px',
            margin: '0 auto',
            border: '1px solid grey',
            
        };
        const labelStyle = {
            margin: '15px',
            fontFamily: 'sans-serif',
            fontSize: '15px',
        };
        const inputStyle = {
            width: '180px',
            padding: '10px',
            fontFamily: 'sans-serif',
            fontSize: '15px',
            border: 'none',
        };
        const formStyle = {
            borderBottom: '1px solid grey',
        }
        return (
            <div style={divStyle}>
                <form style={formStyle} onSubmit={event => this.onSubmit(event)}>
                    <label htmlFor="searchText" style={labelStyle}>Search by user name:</label>
                    <input
                        type="text"
                        id="searchText"
                        style={inputStyle}
                        placeholder="at least 1 character"
                        onChange={event => this.onChangeHandle(event)}
                        value={this.state.searchText}/>
                </form>
                <UsersList users={this.state.users}/>
            </div>
        );
    }
}

class UsersList extends React.Component {
    get users() {
        return this.props.users.map(user => <User key={user.id} user={user}/>);
    }
  
    render() {
        return (
            <div>
                {this.users}
            </div>
        );
    }
}

class User extends React.Component {
    render() {
        const imgStyle = {
            paddingLeft: '10px',
            paddingRight: '10px',
            maxWidth: '100px',
        };
        const linkStyle = {
            fontFamily: 'sans-serif',
        };
        const listStyle = {
            paddingBottom: '10px',
            paddingTop: '10px',
            borderBottom: '1px solid grey',
        }
        return (
            <div style={listStyle}>
                <img src={this.props.user.avatar_url} style={imgStyle}/>
                <a href={this.props.user.html_url} target="_blank" style={linkStyle}>{this.props.user.login}</a>
            </div>
        );
    }
  
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);