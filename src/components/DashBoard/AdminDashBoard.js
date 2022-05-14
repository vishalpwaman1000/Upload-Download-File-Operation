import React, { Component } from 'react'
import './AdminDashBoard.scss'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile'
import VisibilityIcon from '@material-ui/icons/Visibility'
import ArchiveIcon from '@material-ui/icons/Archive'
import ReactFileReader from 'react-file-reader'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import DeleteIcon from '@material-ui/icons/Delete'
import CircularProgress from '@material-ui/core/CircularProgress'
import Pagination from '@material-ui/lab/Pagination'
import FileOperation from '../../services/FileOperation'
import GetFileList from './GetFileList'

const fileOperation = new FileOperation()

export default class AdminDashBoard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //
      File: new FormData(),
      FileName: '',
      FileExist: false,
      //
      NumberOfRecordPerPage: 8,
      //
      PageNumber: 1,
      ArchivePageNumber: 1,
      TrashPageNumber: 1,
      //
      FileDataList: [],
      TotalPages: 0,
      TotalRecords: 0,

      open: false,
      MenuOpen: false,
      OpenUploadFile: false,
      OpenLoader: false,

      OpenInsert: true,
      OpenShow: false,
      OpenArchive: false,
      OpenTrash: false,
    }
  }

  componentWillMount() {
    console.log('Component Will Mount Calling ..... ')
    // this.GetFileData(this.state.PageNumber)
  }

  LoaderToggling = () => {
    this.setState({ OpenLoader: !this.state.OpenLoader })
  }

  GetFileData = (CurrentPageNumber) => {
    console.log('Get File Data Method Calling .... ')
    let data = {
      numberOfRecordPerPage: this.state.NumberOfRecordPerPage,
      pageNumber: CurrentPageNumber,
    }
    fileOperation
      .GetFileList(data)
      .then((data) => {
        console.log('Data : ', data)
        this.setState({
          FileDataList: data.data.data,
          TotalPages: data.data.totalPage,
        })
      })
      .catch((error) => {
        console.log('Error : ', error)
      })
  }

  GetTrashFileData = (CurrentPageNumber) => {
    console.log('Get Trash File Data Method Calling .... ')
    let data = {
      numberOfRecordPerPage: this.state.NumberOfRecordPerPage,
      pageNumber: CurrentPageNumber,
    }
    fileOperation
      .GetTrashFileList(data)
      .then((data) => {
        console.log('Data : ', data)
        this.setState({
          FileDataList: data.data.data,
          TotalPages: data.data.totalPage,
        })
      })
      .catch((error) => {
        console.log('Error : ', error)
      })
  }

  GetArchiveFileData = (CurrentPageNumber) => {
    console.log('Get Archive File Data Method Calling .... ')
    let data = {
      numberOfRecordPerPage: this.state.NumberOfRecordPerPage,
      pageNumber: CurrentPageNumber,
    }
    fileOperation
      .GetArchiveFileList(data)
      .then((data) => {
        console.log('Data : ', data)
        this.setState({
          FileDataList: data.data.data,
          TotalPages: data.data.totalPage,
        })
      })
      .catch((error) => {
        console.log('Error : ', error)
      })
  }

  handleOpen = () => {
    this.setState({
      File: new FormData(),
      open: true,
      OpenInsert: true,
      OpenShow: false,
      OpenArchive: false,
      OpenTrash: false,
      TotalPages: !this.state.OpenInsert ? 0 : this.state.TotalPages,
    })
  }

  handleOpenList = (e) => {
    this.GetFileData(this.state.PageNumber)
    this.setState({
      OpenFileList: true,
      OpenInsert: false,
      OpenShow: true,
      OpenArchive: false,
      OpenTrash: false,
    })
  }

  handleArchiveOpen = () => {
    this.GetArchiveFileData(this.state.ArchivePageNumber)
    this.setState({
      OpenFileList: false,
      OpenInsert: false,
      OpenShow: false,
      OpenArchive: true,
      OpenTrash: false,
    })
  }

  handleTrashOpen = () => {
    this.GetTrashFileData(this.state.TrashPageNumber)
    this.setState({
      OpenFileList: false,
      OpenInsert: false,
      OpenShow: false,
      OpenArchive: false,
      OpenTrash: true,
    })
  }

  handleClose = () => {
    this.setState({ open: false })
    // setOpen(false)
  }

  handleMenuButton = (e) => {
    this.setState({
      MenuOpen: !this.state.MenuOpen,
    })
  }

  handleFiles = (files) => {
    console.log('handleFiles Calling....', files)

    this.setState({
      File: files[0],
      FileName: files[0].name,
      FileExist: true,
    })
  }

  handleSubmit = (e) => {
    console.log('File Data : ', this.state)
    if (this.state.FileExist) {
      this.setState({ open: false, OpenLoader: true })
      const data = new FormData()
      data.append('file', this.state.File)
      fileOperation
        .UploadFileOnCloud(data)
        .then((data) => {
          console.log('Data : ', data)
          this.setState({
            MenuOpen: false,
            OpenLoader: false,
            OpenFileList: true,
          })
          this.GetFileData(this.state.PageNumber)
        })
        .catch((error) => {
          console.log('Error : ', error)
          this.setState({
            MenuOpen: false,
            OpenLoader: false,
            OpenFileList: true,
          })
          this.GetFileData(this.state.PageNumber)
        })
    } else {
      console.log('File Not Exist')
    }
  }

  handlePaging = (value) => {
    if (this.state.OpenShow) {
      this.setState({ PageNumber: value })
      this.GetFileData(value)
    } else if (this.state.OpenTrash) {
      this.setState({ TrashPageNumber: value })
      this.GetTrashFileData(value)
    } else {
      this.setState({ ArchivePageNumber: value })
      this.GetArchiveFileData(value)
    }
  }

  render() {
    console.log('State : ', this.state)
    let state = this.state
    return (
      <div className="AdminDashBoard-Container">
        <div className="Sub-Container">
          <div className="Header">
            <AppBar position="static">
              <Toolbar>
                <IconButton
                  edge="start"
                  className=""
                  color="inherit"
                  onClick={this.handleMenuButton}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                  Admin DashBoard
                </Typography>
                <Button color="inherit">Login</Button>
              </Toolbar>
            </AppBar>
          </div>
          <div className="Body">
            <div className="Sub-Body">
              <div className={state.MenuOpen ? 'SubBody11' : 'SubBody12'}>
                <div
                  className={state.OpenInsert ? 'NavButton1' : 'NavButton2'}
                  onClick={this.handleOpen}
                >
                  <IconButton edge="start" className="NavBtn" color="inherit">
                    <InsertDriveFileIcon />
                  </IconButton>
                  {state.MenuOpen ? (
                    <div className="NavButtonText">Insert File</div>
                  ) : null}
                </div>

                <div
                  className={state.OpenShow ? 'NavButton1' : 'NavButton2'}
                  onClick={this.handleOpenList}
                >
                  <IconButton edge="start" className="NavBtn" color="inherit">
                    <VisibilityIcon />
                  </IconButton>
                  {this.state.MenuOpen ? (
                    <div className="NavButtonText">Show File</div>
                  ) : null}
                </div>

                <div
                  className={state.OpenArchive ? 'NavButton1' : 'NavButton2'}
                  onClick={this.handleArchiveOpen}
                >
                  <IconButton edge="start" className="NavBtn" color="inherit">
                    <ArchiveIcon />
                  </IconButton>
                  {this.state.MenuOpen ? (
                    <div className="NavButtonText">Archive File</div>
                  ) : null}
                </div>

                <div
                  className={state.OpenTrash ? 'NavButton1' : 'NavButton2'}
                  onClick={this.handleTrashOpen}
                >
                  <IconButton edge="start" className="NavBtn" color="inherit">
                    <DeleteIcon />
                  </IconButton>
                  {this.state.MenuOpen ? (
                    <div className="NavButtonText">Trash File</div>
                  ) : null}
                </div>
              </div>
              <div className={state.MenuOpen ? 'SubBody21' : 'SubBody22'}>
                <Modal
                  aria-labelledby="transition-modal-title"
                  aria-describedby="transition-modal-description"
                  // className={classes.modal}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  open={this.state.open}
                  onClose={this.handleClose}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={this.state.open}>
                    <div
                      style={{
                        backgroundColor: 'white',
                        boxShadow: '5',
                        padding: '2px 4px 3px',
                        width: '300px',
                        height: '300px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                      }}
                    >
                      <div
                        style={{
                          margin: '20px',
                          fontFamily: 'Roboto',
                          fontWeight: '500',
                        }}
                      >
                        {this.state.File.name === null
                          ? ''
                          : this.state.File.name}
                      </div>
                      <ReactFileReader
                        handleFiles={this.handleFiles}
                        fileTypes={'.*'}
                        className="Upload"
                      >
                        <Button
                          variant="contained"
                          color="secondary"
                          component="span"
                          style={{ margin: '20px' }}
                        >
                          Submit File
                        </Button>
                      </ReactFileReader>
                      <Button
                        variant="contained"
                        color="primary"
                        component="span"
                        onClick={this.handleSubmit}
                      >
                        Upload On Cloud
                      </Button>
                    </div>
                  </Fade>
                </Modal>
                {state.OpenInsert ? (
                  <div className="DashBoard">Admin DashBoard</div>
                ) : state.OpenFileList ||
                  state.OpenArchive ||
                  state.OpenTrash ? (
                  <GetFileList
                    state={this.state}
                    List={this.state.FileDataList}
                    //
                    OpenShow={state.OpenShow}
                    OpenArchive={state.OpenArchive}
                    OpenTrash={state.OpenTrash}
                    //
                    CurrentPage={this.state.PageNumber}
                    ArchivePageNumber={this.state.ArchivePageNumber}
                    TrashPageNumber={this.state.TrashPageNumber}
                    //
                    GetFileData={this.GetFileData}
                    GetTrashFileData={this.GetTrashFileData}
                    GetArchiveFileData={this.GetArchiveFileData}
                    LoaderToggling={this.LoaderToggling}
                  />
                ) : null}
              </div>
            </div>
            <Pagination
              count={this.state.TotalPages}
              Page={this.state.PageNumber}
              onChange={this.handlePaging}
              variant="outlined"
              shape="rounded"
              color="secondary"
            />
          </div>
        </div>
        <Backdrop
          style={{ zIndex: '-1', color: '#fff' }}
          open={this.state.OpenLoader}
          onClick={() => {
            this.setState({ OpenLoader: false })
          }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    )
  }
}
