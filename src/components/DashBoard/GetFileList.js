import React from 'react'
import './GetFileList.scss'
import IconButton from '@material-ui/core/IconButton'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import ArchiveIcon from '@material-ui/icons/Archive'
import DeleteIcon from '@material-ui/icons/Delete'
import RestoreIcon from '@material-ui/icons/Restore'
import FileOperation from '../../services/FileOperation'
import DownloadLink from 'react-download-link'
import { saveAs } from 'file-saver'
// var FileSaver = require('file-saver')

const fileOperation = new FileOperation()

export default function GetFileList(props) {
  const handleDownload = (fileName, fileUrl) => {
    console.log(
      'handleDownload Method Calling .... File Name',
      fileName,
      ' Url : ',
      fileUrl,
    )
    //npm i file-saver
    saveAs(fileUrl, fileName)
  }

  const handleMethod = () => {
    console.log('handle Method Calling ... ')
    if (props.OpenArchive) {
      props.GetArchiveFileData(props.ArchivePageNumber)
    } else if (props.OpenTrash) {
      props.GetTrashFileData(props.TrashPageNumber)
    }
  }

  const handleTrash = (fileID) => {
    console.log('File ID : ', fileID)

    let data = {
      fileID: fileID,
    }

    fileOperation
      .UpdateAsTrashFile(data)
      .then((data) => {
        console.log('Data : ', data)
        props.GetFileData(props.CurrentPage)
      })
      .catch((error) => {
        console.log('Error : ', error)
        props.GetFileData(props.CurrentPage)
      })
  }

  const handleArchive = (fileID) => {
    console.log('File ID : ', fileID)

    let data = {
      fileID: fileID,
    }

    fileOperation
      .UpdateAsArchiveFile(data)
      .then((data) => {
        console.log('Data : ', data)
        props.GetFileData(props.CurrentPage)
      })
      .catch((error) => {
        console.log('Error : ', error)
        props.GetFileData(props.CurrentPage)
      })
  }

  const handleRestoreArchiveTrashFile = (fileID) => {
    let data = undefined
    if (props.OpenArchive) {
      data = {
        operationType: 'Archive',
        fileID: fileID,
      }
    } else if (props.OpenTrash) {
      data = {
        operationType: 'Trash',
        fileID: fileID,
      }
    }

    fileOperation
      .RestoreTrashArchiveFile(data)
      .then((data) => {
        console.log('Data : ', data)
        handleMethod()
      })
      .catch((error) => {
        console.log('Error : ', error)
        handleMethod()
      })
  }

  const handleDeleteFile = (fileID) => {
    props.LoaderToggling()
    let data = {
      fileID: fileID,
    }

    fileOperation
      .DeleteFile(data)
      .then((data) => {
        console.log('Data : ', data)
        props.GetFileData(props.CurrentPage)
        props.LoaderToggling()
      })
      .catch((error) => {
        console.log('Error : ', error)
        props.GetFileData(props.CurrentPage)
        props.LoaderToggling()
      })
  }

  const Notes =
    props.List !== null
      ? props.List.map((note, index) => (
          <div className="File-Container" key={index}>
            <div className="File-Body">
              <img className="Thumbnail" src={note.fileTypeUrl} alt="" />
              <div className="File-Name">{note.fileName}</div>

              {props.OpenShow ? (
                <div className="File-Operations">
                  <IconButton
                    color="primary"
                    component="span"
                    size="small"
                    onClick={() => {
                      handleDownload(note.fileName, note.fileUrl)
                    }}
                  >
                    <CloudDownloadIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    component="span"
                    onClick={() => {
                      handleTrash(note.fileID)
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    component="span"
                    onClick={() => {
                      handleArchive(note.fileID)
                    }}
                    size="small"
                  >
                    <ArchiveIcon />
                  </IconButton>
                </div>
              ) : props.OpenArchive || props.OpenTrash ? (
                <div className="File-Operations">
                  <IconButton
                    color="secondary"
                    component="span"
                    size="small"
                    onClick={() => {
                      handleRestoreArchiveTrashFile(note.fileID)
                    }}
                  >
                    <RestoreIcon />
                  </IconButton>
                  {props.OpenTrash ? (
                    <IconButton
                      color="secondary"
                      component="span"
                      size="small"
                      onClick={() => {
                        handleDeleteFile(note.fileID)
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        ))
      : null

  return (
    <div className="GetFileList-Container">
      <div className="Sub-Container">{Notes}</div>
    </div>
  )
}
