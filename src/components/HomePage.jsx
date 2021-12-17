import React, { Component } from 'react'
import './HomePage.scss'
import { TextField, Button } from '@material-ui/core'
import CrudServices from '../services/CrudServices'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
const crudService = new CrudServices()

export default class HomePage extends Component {
  constructor() {
    super()
    this.state = {
      UserId: 0,
      UserName: '',
      Age: '',
      Information: [],
      error: {
        UserName: '',
        Age: '',
      },
      UpdateFlag: false,
    }
    this.ReadInformationMethod = this.ReadInformationMethod.bind(this)
  }

  componentWillMount() {
    console.log('Component Will Mount')
    this.ReadInformationMethod()
  }

  ReadInformationMethod() {
    crudService
      .ReadInformation()
      .then((data) => {
        // console.clear()
        console.table(data.data)
        console.table(data.data.readInformation)
        this.setState({ Information: data.data.readInformation })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  handleSubmit = () => {
    if (this.state.UserName === '' || Number(this.state.Age) < 1) {
      console.log('Data Is Null Found')
      return
    }

    console.table(this.state)

    if (this.state.UpdateFlag === false) {
      console.log('Insertion Operation')
      const data = {
        userName: this.state.UserName,
        age: Number(this.state.Age),
      }

      console.table(data)

      crudService
        .CreateInformation(data)
        .then((data) => {
          console.table(data.data)
          this.ReadInformationMethod()
        })
        .catch((error) => {
          console.table('Error : ' + error)
        })
    } else {
      console.log('Update Operation')
      const data = {
        userName: this.state.UserName,
        age: Number(this.state.Age),
        userId: this.state.UserID,
      }

      console.table(data)

      crudService
        .UpdateInformation(data)
        .then((data) => {
          console.table(data.data)
          this.ReadInformationMethod()
        })
        .catch((error) => {
          console.table('Error : ' + error)
        })
    }
    this.setState({ UpdateFlag: false, UserName: '', Age: '' })
  }

  handleChanges = (e) => {
    const { name, value } = e.target
    this.setState({ [name]: value })
    console.log('name : ' + name + ' value : ' + value)
  }

  handleEdit = (data) => {
    console.table(data)
    this.setState({
      UserID: data.userID,
      UserName: data.userName,
      Age: data.age,
      UpdateFlag: true,
    })
  }

  handleDelete = (datas) => {
    console.log('handle Delete call', datas.userID)
    const data = {
      userId: datas.userID,
    }
    crudService
      .DeleteInformation(data)
      .then((data) => {
        console.table(data.data)
        this.ReadInformationMethod()
      })
      .catch((error) => {
        console.log(error)
        this.ReadInformationMethod()
      })
    
  }

  render() {
    let state = this.state
    let self = this
    return (
      <div className="MainContainer">
        <div className="SubContainer">
          <div className="Box1">
            <div className="Input-Container">
              <div className="flex-containt">
                <TextField
                  fullWidth
                  id="UserName"
                  name="UserName"
                  placeholder="UserName"
                  variant="outlined"
                  size="small"
                  value={state.UserName}
                  onChange={this.handleChanges}
                />
              </div>
              <div className="flex-containt">
                <TextField
                  fullWidth
                  id="Age"
                  name="Age"
                  placeholder="Age"
                  variant="outlined"
                  size="small"
                  value={state.Age}
                  onChange={this.handleChanges}
                />
              </div>
              <div className="flex-button">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={this.handleSubmit}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>
          <div className="Box2">
            {this.state.Information.map(function (data, index) {
              return (
                <div key={index} className="data-flex">
                  <div className="UserID">{data.userID}</div>
                  <div className="UserName">{data.userName}</div>
                  <div className="Age">{data.age}</div>
                  <div className="Update">
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => {
                        self.handleEdit(data)
                      }}
                    >
                      <EditIcon />
                    </Button>
                  </div>
                  <div className="Delete">
                    <Button
                      variant="outlined"
                      onClick={() => {
                        self.handleDelete(data)
                      }}
                    >
                      <DeleteIcon />
                    </Button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}
