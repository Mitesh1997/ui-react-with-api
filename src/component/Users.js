import React, { Component } from 'react'


export default class Users extends Component {
    //both are object
    //state --mutable (change kar sakte hai ) --child create karenga
    //props --immutable (change nhi hota) -- parent to child

    //state = props
    constructor(props) {
        super(props)
        console.log('constructor -- leke aao gooda')
        this.state = {
            users: [],
            currentPage: 0,
            totalPage: [],
            per_page: 0
        }

    }

    // static getDerivedStateFromProps() {
    //     console.log('getDerivedStateFromProps --- a man with black horse')
    //     return null;
    // }

    render() { //create virtual dom -- compare it will (previous dom ~~ real dom) -- the update real dom
        console.log('render -- horse be chad na')
        return (
            <div >
                {this.state.currentPage && this.state.users[this.state.currentPage].map((ele, index) => { //callback function arrow
                    return <div style={{ alignItems: 'center', background: 'white', padding: '10px', border: '1px solid #ccc' }}>
                        <div style={{ marginLeft: '10px' }}>
                            <p style={{ margin: '0px', marginBottom: '10px' }}> Name: {ele.first_name} {ele.last_name} </p>
                            <p style={{ margin: '0px', marginBottom: '10px' }}> Email: {ele.email} </p>
                        </div>

                        <img style={{ width: '100px', height: '100' }} src={ele.avatar} alt='users' />


                    </div>
                })}
                <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center' }}>
                    {
                        this.state.totalPage.map((ele, index) => {
                            return <div onClick={() => this.fetchingUsers(ele)} style={{ width: '20px', marginRight: '10px', cursor: 'pointer', height: '20px', background: 'yellow' }}>{ele}</div>
                        })
                    }
                </div>
            </div>
        )
    }



    componentDidMount() { //ya pe API call -- fetch -- javascript, axios -- react,nodejs, httpclient--angular, ajax--jquery --> api call karne
        console.log('component did mount --api call started');
        this.fetchingUsers(1);
    }

    fetchingUsers(page) {
        if (this.state.per_page === 0 || this.state.users[page] === undefined) {
            fetch('https://reqres.in/api/users?page=' + page)
                .then(response => response.json())
                .then(data => {
                    console.log('api responsed ended');
                    var totalPage = this.state.totalPage; //[]
                    var users = this.state.users;
                    if (totalPage.length === 0) {
                        for (var i = 1; i <= data.total_pages; i++) { //total_pages = 2    i=1; i=2;
                            totalPage.push(i); //[1] [1,2]
                        }
                    }
                    users[page] = data.data;
                    this.setState({
                        users: users,
                        totalPage: totalPage,
                        currentPage: page,
                        per_page: data.per_page
                    })
                })
        } else {
            this.setState({
                currentPage: page
            })
        }
    }


}

//Lifecycle of React
//Three Part Initialize + Mounting Phase, Updating Phase, UnMounting Phase
//Initialize //Mounting -- constructor, getDerivedStateFromProps, render, componentDidMount