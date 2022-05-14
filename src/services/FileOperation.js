import AxiosServices from './AxiosServices'
import Configurations from '../configurations/Configurations'

const axiosServices = new AxiosServices()

export default class FileOperation {
  UploadFileOnCloud(data) {
    console.log('UploadFileOnCloud API Calling..... & Data : ',data);
    return axiosServices.post(Configurations.UploadFile, data, false)
  }

  GetFileList(data) {
    console.log('GetFileList API Calling..... & Data : ',data);
    return axiosServices.post(Configurations.GetFileList, data, false)
  }

  UpdateAsArchiveFile(data) {
    console.log('UpdateAsArchiveFile API Calling..... & Data : ',data);
    return axiosServices.post(Configurations.UpdateAsArchiveFile, data, false)
  }

  GetArchiveFileList(data) {
    console.log('GetArchiveFileList API Calling..... & Data : ',data);
    return axiosServices.post(Configurations.GetArchiveFileList, data, false)
  }

  UpdateAsTrashFile(data) {
    console.log('UploadAsTrashFile API Calling..... & Data : ',data);
    return axiosServices.post(Configurations.UpdateAsTrashFile, data, false)
  }

  GetTrashFileList(data){
    console.log('GetTrashFileList API Calling..... & Data : ',data);
    return axiosServices.post(Configurations.GetTrashFileList, data, false)
  }

  RestoreTrashArchiveFile(data){
    console.log('RestoreTrashArchiveFile API Calling..... & Data : ',data);
    return axiosServices.post(Configurations.RestoreTrashArchiveFile, data, false)
  }

  DeleteFile(data){
    console.log('DeleteFile API Calling..... & Data : ',data);
    return axiosServices.post(Configurations.DeleteFile, data, false)
  }
}
