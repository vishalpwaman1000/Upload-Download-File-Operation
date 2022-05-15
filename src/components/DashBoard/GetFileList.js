import React, { useState } from 'react'
import './GetFileList.scss'
import IconButton from '@material-ui/core/IconButton'
import CloudDownloadIcon from '@material-ui/icons/CloudDownload'
import ArchiveIcon from '@material-ui/icons/Archive'
import DeleteIcon from '@material-ui/icons/Delete'
import RestoreIcon from '@material-ui/icons/Restore'
import FileOperation from '../../services/FileOperation'
import { saveAs } from 'file-saver'

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
      props.GetFileData(props.ArchivePageNumber, 'Archive')
    } else if (props.OpenTrash) {
      props.GetFileData(props.TrashPageNumber, 'Trash')
    }
  }

  const UpdateAsArchiveTrashFile = (fileID, TrashOrArchive, OperationType) => {
    console.log('File ID : ', fileID, 'OperationType : ', OperationType)

    let data = {
      operationType: TrashOrArchive,
      fileID: fileID,
    }

    fileOperation
      .UpdateAsArchiveTrashFile(data)
      .then((data) => {
        console.log('Data : ', data)
        props.GetFileData(props.CurrentPage, OperationType)
      })
      .catch((error) => {
        console.log('Error : ', error)
        props.GetFileData(props.CurrentPage, OperationType)
      })
  }

  const handleArchive = (fileID, OperationType) => {
    console.log('File ID : ', fileID, 'OperationType : ', OperationType)

    let data = {
      fileID: fileID,
    }

    fileOperation
      .UpdateAsArchiveFile(data)
      .then((data) => {
        console.log('Data : ', data)
        props.GetFileData(props.ArchivePageNumber, OperationType)
      })
      .catch((error) => {
        console.log('Error : ', error)
        props.GetFileData(props.ArchivePageNumber, OperationType)
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

  const handleDeleteFile = (file_ID, file_Name, public_ID) => {
    props.LoaderToggling(false, '')
    let data = {
      fileID: file_ID,
      fileName: file_Name,
      publicID: public_ID,
    }

    fileOperation
      .DeleteFile(data)
      .then((data) => {
        console.log('Data : ', data)
        props.GetFileData(props.TrashPageNumber, 'Trash')
        props.LoaderToggling(true, data.data.message)
      })
      .catch((error) => {
        console.log('Error : ', error)
        props.GetFileData(props.TrashPageNumber, 'Trash')
        props.LoaderToggling(true, 'Something Went Wrong')
      })
  }

  const Notes =
    props.List !== null
      ? props.List.map((note, index) => (
          <div className="File-Container" key={index}>
            <div className="File-Body">
              <img
                className="Thumbnail"
                src={note.fileTypeUrl}
                alt=""
                onClick={() => {
                  props.handleInfoModel(note)
                }}
              />
              <div
                className="File-Name"
                onClick={() => {
                  props.handleInfoModel(note)
                }}
              >
                {note.fileName}
              </div>

              {props.OpenShow ? (
                <div className="File-Operations">
                  <IconButton
                    color="secondary"
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
                      UpdateAsArchiveTrashFile(note.fileID, 'Trash', 'Active')
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    component="span"
                    onClick={() => {
                      UpdateAsArchiveTrashFile(note.fileID, 'Archive', 'Active')
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

                  <IconButton
                    color=""
                    component="span"
                    size="small"
                    onClick={() => {
                      props.OpenTrash
                        ? handleDeleteFile(
                            note.fileID,
                            note.fileName,
                            note.resourcePublicID,
                          )
                        : UpdateAsArchiveTrashFile(
                            note.fileID,
                            'Trash',
                            'Archive',
                          )
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
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
