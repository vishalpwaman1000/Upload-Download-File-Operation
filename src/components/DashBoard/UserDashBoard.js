import React, { Component } from 'react'
import './UserDashBoard.scss'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import GetFileList from './GetFileList'
import FileOperation from '../../services/FileOperation'
import Pagination from '@material-ui/lab/Pagination'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import GetAppIcon from '@material-ui/icons/GetApp'
import { saveAs } from 'file-saver'

const fileOperation = new FileOperation()

export default class UserDashBoard extends Component {
  constructor() {
    super()
    this.state = {
      Role: 'User',
      //
      PageNumber: 1,
      NumberOfRecordPerPage: 10,
      TotalPages: 0,
      //
      FileDataList: [],

      //
      OpenInfoModel: false,
      noteInfo: [],
    }
  }

  componentWillMount() {
    console.log('Component Will Mount Calling ..... ')
    this.GetFileData(this.state.PageNumber)
  }

  GetFileData = (CurrentPageNumber) => {
    console.log(
      'Get File Data Method Calling .... CurrentPageNumber : ',
      CurrentPageNumber,
    )

    let data = {
      operationType: 'Active',
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
        this.setState({
          Message: 'Something Went Wrong',
          OpenSnackBar: true,
        })
      })
  }

  handlePaging = (event, value) => {
    this.setState({ PageNumber: value })
    this.GetFileData(value)
  }

  handleInfoModel = (note) => {
    this.setState(
      { OpenInfoModel: true, noteInfo: note },
      console.log('handleInfoModel Calling ...'),
    )
  }

  handleDownload = (fileName, fileUrl) => {
    console.log(
      'handleDownload Method Calling .... File Name',
      fileName,
      ' Url : ',
      fileUrl,
    )
    //npm i file-saver
    saveAs(fileUrl, fileName)
  }

  handleClose = () => {
    this.setState({ OpenInfoModel: false })
  }

  render() {
    let state = this.state
    return (
      <div className="UserDashBoard-Container">
        <div className="Sub-Container">
          <div className="Header">
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                  User DashBoard
                </Typography>
                <Button
                  color="inherit"
                  onClick={() => {
                    this.props.history.push('/SignIn')
                  }}
                >
                  LogOut
                </Button>
              </Toolbar>
            </AppBar>
          </div>
          <div className="Body">
            <div className="Sub-Body">
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: 'none',
                }}
                open={this.state.OpenInfoModel}
                onClose={this.handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade
                  in={this.state.OpenInfoModel}
                  className="Fade"
                  style={{ border: 'none' }}
                >
                  <div
                    className="FadeDetail"
                    style={{
                      backgroundColor: 'white',
                      boxShadow: '5',
                      padding: '2px 4px 3px',
                      width: '500px',
                      height: '500px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'column',
                      border: 'none',
                    }}
                  >
                    <img
                      src={this.state.noteInfo.fileTypeUrl}
                      alt=""
                      className="FileTypeImage"
                    />

                    <div className="FileDetail">
                      <div className="Text">File ID</div>
                      <div className="Detail">{this.state.noteInfo.fileID}</div>
                    </div>
                    <div className="FileDetail">
                      <div className="Text">File Name</div>
                      <div className="Detail">
                        {this.state.noteInfo.fileName}
                      </div>
                    </div>
                    <div className="FileDetail">
                      <div className="Text">Public ID</div>
                      <div className="Detail">
                        {this.state.noteInfo.resourcePublicID}
                      </div>
                    </div>
                    <div className="FileDetail">
                      <div className="Text">Created Date</div>
                      <div className="Detail">
                        {this.state.noteInfo.insertionDate}
                      </div>
                    </div>
                    <div className="FileDetail">
                      <div className="Text">File Status</div>
                      <div className="Detail">
                        {this.state.noteInfo.fileStatus}
                      </div>
                    </div>
                    <div className="DownloadButton">
                      <Button
                        variant="contained"
                        // color="primary"
                        style={{ backgroundColor: 'Black', color: 'white' }}
                        component="span"
                        className="SubButton"
                        onClick={() => {
                          this.handleDownload(
                            this.state.noteInfo.fileName,
                            this.state.noteInfo.fileUrl,
                          )
                        }}
                      >
                        Download &nbsp; <GetAppIcon />
                      </Button>
                    </div>
                  </div>
                </Fade>
              </Modal>
              <GetFileList
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
                handleInfoModel={this.handleInfoModel}
                LoaderToggling={this.LoaderToggling}
              />
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
      </div>
    )
  }
}
