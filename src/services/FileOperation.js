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

  UpdateAsArchiveTrashFile(data) {
    console.log('UpdateAsArchiveTrashFile API Calling..... & Data : ',data);
    return axiosServices.post(Configurations.UpdateAsArchiveTrashFile, data, false)
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
